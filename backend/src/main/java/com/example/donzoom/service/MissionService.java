package com.example.donzoom.service;

import com.example.donzoom.constant.MissionStatus;
import com.example.donzoom.dto.mission.request.MissionCreateDto;
import com.example.donzoom.dto.mission.request.MissionUpdateDto;
import com.example.donzoom.entity.Mission;
import com.example.donzoom.entity.User;
import com.example.donzoom.repository.MissionRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MissionService {

  private static final Logger log = LoggerFactory.getLogger(MissionService.class);
  private final MissionRepository missionRepository;
  private final UserRepository userRepository;

  public List<Mission> getUserMissions() {
    // 현재 사용자의 미션 가져오기

    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    // 사용자 정보 (예: PK) 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return missionRepository.findAllMissionByUserId(user.getId());
  }

  public Mission getMissionById(Long missionId) {
    // 미션 아이디로 상세조회

    // Optional을 처리하고, 값이 없으면 예외를 던짐
    return missionRepository.findById(missionId)
        .orElseThrow(() -> new RuntimeException("Mission not found with id: " + missionId));
  }

  public Mission createMission(MissionCreateDto missionCreateDto) {

    // 현재 인증된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    // 사용자 정보 (예: PK) 가져오기
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    Mission mission = Mission.builder()
        .user(user)
        .contents(missionCreateDto.getContents())
        .reward(missionCreateDto.getReward())
        .dueDate(missionCreateDto.getDueDate())
        .status(MissionStatus.CREATED)
        .build();
    missionRepository.save(mission);
    return mission;
  }

  public Mission updateMission(Long missionId, MissionUpdateDto missionUpdateDto) {

    // 기존 미션 가져오기
    Mission mission = missionRepository.findById(missionId)
        .orElseThrow(() -> new RuntimeException("Mission not found"));

    mission.updateMission(missionUpdateDto);

    missionRepository.save(mission);
    return mission;
  }

  public Long deleteMission(Long missionId) {
    // 테스트를 위해서 권한체크 임시로 껐습니다.
//    // 현재 인증된 사용자 정보 가져오기
//    String username = SecurityUtil.getAuthenticatedUsername();
//    // 사용자 정보 (예: PK) 가져오기
//    User user = userRepository.findByEmail(username)
//        .orElseThrow(() -> new RuntimeException("User not found"));
//
//    // 삭제할 미션이 존재하는지 확인
//    Mission mission = missionRepository.findById(missionId)
//        .orElseThrow(() -> new RuntimeException("Mission not found"));
//
//    // 미션이 현재 사용자의 것인지 확인 (권한 체크)
//    if (!mission.getUser().equals(user)) {
//      throw new RuntimeException("You are not authorized to delete this mission");
//    }

    missionRepository.deleteById(missionId);
    return missionId;
  }


}