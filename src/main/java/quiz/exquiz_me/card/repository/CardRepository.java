package quiz.exquiz_me.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.card.entity.Card;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByUser_Email(String email);
    List<Card> findByTitleContaining(String title);
    void deleteByCardNumber(Long cardNumber);

}
