package com.example.donzoom.service;

import com.example.donzoom.dto.pig.request.PigRequestDto;
import com.example.donzoom.dto.pig.response.PigResponseDto;
import com.example.donzoom.entity.MyPig;
import com.example.donzoom.entity.Pig;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.Wallet;
import com.example.donzoom.repository.MyPigRepository;
import com.example.donzoom.repository.PigRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.repository.WalletRepository;
import com.example.donzoom.util.FileUploadUtil;
import com.example.donzoom.util.SecurityUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class PigService {

  private final MyPigRepository myPigRepository;
  private final PigRepository pigRepository;
  private final WalletRepository walletRepository;
  private final UserRepository userRepository;
  private final FileUploadUtil fileUploadUtil;

  @Transactional(readOnly = true)
  public List<PigResponseDto> findOwnedPigs() {
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // 사용자가 소유한 돼지 조회
    List<MyPig> myPigs = myPigRepository.findByWalletId(user.getWallet().getId());

    // 돼지 정보를 DTO로 변환하여 반환
    return myPigs.stream()
        .map(myPig -> PigResponseDto.builder()
            .pigId(myPig.getPig().getId())
            .imageUrl(myPig.getPig().getImageUrl())
            .pigName(myPig.getPig().getPigName())
            .description(myPig.getPig().getDescription())
            .createdAt(Optional.ofNullable(myPig.getCreatedAt()).map(LocalDateTime::toString).orElse("N/A"))
            .build())
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<PigResponseDto> findPigs() {

    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Wallet wallet = user.getWallet();

    // 사용자가 소유한 돼지 목록 조회 (MyPig에서 조회)
    List<MyPig> myPigs = myPigRepository.findByWalletId(wallet.getId());

    // 소유한 돼지 ID와 생성 날짜를 매핑하는 맵 생성 (null 값 방지 처리)
    Map<Long, LocalDateTime> ownedPigWithCreationDate = myPigs.stream()
        .collect(Collectors.toMap(
            myPig -> myPig.getPig().getId(),
            myPig -> myPig.getCreatedAt() != null ? myPig.getCreatedAt() : LocalDateTime.now() // null 값 처리
        ));

    // 모든 돼지 리스트 가져오기
    List<Pig> allPigs = pigRepository.findAll();

    // 소유한 돼지는 실제 이미지 및 createdAt, 소유하지 않은 돼지는 실루엣 이미지로 반환
    return allPigs.stream()
        .map(pig -> {
          boolean isOwned = ownedPigWithCreationDate.containsKey(pig.getId());
          String imageUrl = isOwned ? pig.getImageUrl() : pig.getSilhouetteImageUrl();
          String createdAt = isOwned && ownedPigWithCreationDate.get(pig.getId()) != null
              ? ownedPigWithCreationDate.get(pig.getId()).toString()
              : null;  // 소유한 돼지의 createdAt 또는 null

          return PigResponseDto.builder()
              .pigId(pig.getId())
              .pigName(pig.getPigName())
              .imageUrl(imageUrl)
              .createdAt(createdAt)  // 소유한 돼지의 createdAt을 추가
              .description(pig.getDescription())
              .build();
        })
        .collect(Collectors.toList());
  }


  //돼지 아이디로 돼지 상세보기
  @Transactional(readOnly = true)
  public PigResponseDto findPigById(Long pigId) {
    Pig pig = pigRepository.findById(pigId)
        .orElseThrow(() -> new IllegalArgumentException("Pig not found with id: " + pigId));

    return PigResponseDto.builder().pigId(pig.getId()).imageUrl(pig.getImageUrl())
        .pigName(pig.getPigName()).build();
  }

  @Transactional
  public List<PigResponseDto> getRandomPigsAndAddToWallet(String amount) {
    Integer count = Integer.parseInt(amount);
    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    // user에서 지갑 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));
    Long walletId = user.getWallet().getId();

    // 지갑 조회
    Wallet wallet = walletRepository.findById(walletId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid wallet ID"));

    // 티켓이 충분한지 검사
    if (wallet.getTicket() < count) {
      throw new IllegalArgumentException("돼지를 뽑을만큼 티켓이 없어요");
    }

    List<Pig> allPigs = pigRepository.findAll(); // 모든 Pig 조회

    // 지갑에 이미 저장된 돼지 목록 조회
    List<MyPig> existingPigsInWallet = myPigRepository.findByWalletId(walletId);

    // 이미 지갑에 있는 돼지 ID를 추출
    Set<Long> existingPigIds = existingPigsInWallet.stream()
        .map(myPig -> myPig.getPig().getId())
        .collect(Collectors.toSet());

    // 확률 기반으로 랜덤하게 돼지를 선택하는 로직
    List<Pig> selectedPigs = new ArrayList<>();
    List<Pig> newPigsToSave = new ArrayList<>(); // 새로 저장할 돼지 목록

    for (int i = 0; i < count; i++) {
      Pig selectedPig = getRandomPigByProbability(allPigs);  // 확률에 따른 Pig 선택
      selectedPigs.add(selectedPig); // 선택된 돼지는 리스트에 추가

      // 중복되지 않은 돼지만 저장 목록에 추가
      if (!existingPigIds.contains(selectedPig.getId())) {
        newPigsToSave.add(selectedPig);
        existingPigIds.add(selectedPig.getId());  // 저장된 돼지 목록에 추가하여 중복 방지
      }
    }

    // 티켓 쓴 만큼 차감
    wallet.updateTicket(wallet.getTicket() - count);

    // 중복되지 않은 돼지만 MyPig에 저장
    for (Pig pig : newPigsToSave) {
      MyPig myPig = MyPig.builder().wallet(wallet).pig(pig).build();
      myPigRepository.save(myPig);
    }

    // PigResponseDto 리스트 반환 (선택된 돼지들을 반환)
    return selectedPigs.stream().map(
        pig -> PigResponseDto.builder().pigId(pig.getId()).imageUrl(pig.getImageUrl())
            .pigName(pig.getPigName()).description(pig.getDescription()).build()).toList();
  }

  private Pig getRandomPigByProbability(List<Pig> pigs) {
    // 전체 가중치의 합 계산
    double totalWeight = pigs.stream().mapToDouble(Pig::getProbability).sum();

    // 0부터 totalWeight 사이의 랜덤 값 생성
    double randomValue = Math.random() * totalWeight;

    double cumulativeWeight = 0.0;
    for (Pig pig : pigs) {
      cumulativeWeight += pig.getProbability();
      if (randomValue <= cumulativeWeight) {
        return pig;  // 누적 가중치 범위에 해당하는 Pig 선택
      }
    }
    return pigs.get(pigs.size() - 1); // 혹시 가중치 범위에 해당하지 않으면 마지막 Pig 반환
  }

  @Transactional
  public String uploadPigAndSave(MultipartFile imageFile, MultipartFile silhouetteFile, String name, double probability,String description) throws IOException {
    // 진짜 돼지 이미지 저장
    String imageFileUrl = fileUploadUtil.saveFile(imageFile, name + "_real");

    // 실루엣 돼지 이미지 저장
    String silhouetteFileUrl = fileUploadUtil.saveFile(silhouetteFile, name + "_silhouette");

    // Pig 엔티티 생성 및 저장
    Pig pig = Pig.builder()
        .imageUrl(imageFileUrl)
        .silhouetteImageUrl(silhouetteFileUrl)
        .pigName(name)
        .probability(probability)
        .description(description)
        .build();

    pigRepository.save(pig);

    return "실제 이미지 URL: " + imageFileUrl + ", 실루엣 이미지 URL: " + silhouetteFileUrl;
  }
}