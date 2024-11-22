package quiz.exquiz_me.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import quiz.exquiz_me.card.entity.CardBookmark;

import java.util.List;
import java.util.Optional;

public interface CardBookmarkRepository extends JpaRepository<CardBookmark, Long> {
    List<CardBookmark> findByUser_Email(String email); // 사용자가 북마크한 카드 목록 조회

    Optional<CardBookmark> findByUser_EmailAndCard_CardNumber(String email, Long cardNumber); // 특정 사용자가 특정 카드를 북마크 했는지 여부 확인

    @Modifying
    @Query("DELETE FROM CardBookmark cb WHERE cb.user.email = :email")
    void deleteByUserEmail(String email);
}