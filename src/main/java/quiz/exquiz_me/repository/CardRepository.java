package quiz.exquiz_me.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.entity.card.Card;

public interface CardRepository extends JpaRepository<Card, Long> {

}
