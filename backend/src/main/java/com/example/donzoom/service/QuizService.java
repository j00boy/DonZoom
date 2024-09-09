package com.example.donzoom.service;

import com.example.donzoom.dto.quiz.request.QuizAnswerDto;
import com.example.donzoom.entity.Quiz;
import com.example.donzoom.entity.User;
import com.example.donzoom.entity.UserQuiz;
import com.example.donzoom.repository.QuizRepository;
import com.example.donzoom.repository.UserQuizRepository;
import com.example.donzoom.repository.UserRepository;
import com.example.donzoom.util.SecurityUtil;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

  private final QuizRepository quizRepository;
  private final UserRepository userRepository;
  private final UserQuizRepository userQuizRepository;

  public List<Quiz> getTodayQuizzes(){
    // 오늘의 퀴즈 안푼것중  (랜덤 3개) 가져오기

    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));


    Pageable limit = PageRequest.of(0, 3);
    return quizRepository.findUnsolvedQuizzesByUser(user.getId(), limit);
  }


  public List<Quiz> getUserQuizzes() {
    // 내가 푼 퀴즈 기록들 가져오기 
    
    // 현재 로그인된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // 유저가 푼 퀴즈 목록 가져오기
    List<UserQuiz> userQuizzes = userQuizRepository.findAllByUserId(user.getId())
        .orElseThrow(() -> new RuntimeException("Quiz Not Found"));
    return userQuizzes.stream().map(UserQuiz::getQuiz).collect(Collectors.toList());
  }

  public void submitAnswer(Long quizId, QuizAnswerDto quizAnswerDto) {
    // 정답 제출하기
    
    // 현재 로그인된 사용자 정보 가져오기
    String username = SecurityUtil.getAuthenticatedUsername();
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // 퀴즈 정보 가져오기
    Quiz quiz = quizRepository.findById(quizId)
        .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));

    // 유저가 제출한 답안을 UserQuiz에 저장
    UserQuiz userQuiz = UserQuiz.builder()
        .user(user)
        .quiz(quiz)
        .selectedAnswer(quizAnswerDto.getAnswer())
        .build();

    userQuizRepository.save(userQuiz);
  }

}