package quiz.exquiz_me.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.card.entity.CardAccessLog;

import java.util.List;
import java.util.Optional;

public interface CardAccessLogRepository extends JpaRepository<CardAccessLog, Long> {
    List<CardAccessLog> findTop5ByUser_EmailOrderByAccessTimeDesc(String email);
    Optional<CardAccessLog> findByUser_EmailAndCard_CardNumber(String email, Long cardNumber); // 사용자 이메일과 카드 번호로 기록 찾기
}