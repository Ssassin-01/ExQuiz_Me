package quiz.exquiz_me.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.card.entity.VocabularyItem;

public interface VocabularyItemRepository extends JpaRepository<VocabularyItem, Long> {

}
