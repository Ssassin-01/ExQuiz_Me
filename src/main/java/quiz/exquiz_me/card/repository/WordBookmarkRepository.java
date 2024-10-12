package quiz.exquiz_me.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.card.entity.CardBookmark;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.card.entity.WordBookmark;
import quiz.exquiz_me.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface WordBookmarkRepository extends JpaRepository<WordBookmark, Long> {
    List<WordBookmark> findByUser_Email(String email);
    Optional<WordBookmark> findByUser_EmailAndVocabularyItem_ItemId(String email, Long itemId);
}