package quiz.exquiz_me.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.card.entity.VocabularyItem;

import java.util.List;

public interface GameVocabularyItemRepository extends JpaRepository<VocabularyItem, Long> {
    List<VocabularyItem> findByCardCardNumber(Long cardNumber);
}