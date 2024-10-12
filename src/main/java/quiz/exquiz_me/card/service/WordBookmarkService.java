package quiz.exquiz_me.card.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.WordBookmark;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.card.repository.WordBookmarkRepository;
import quiz.exquiz_me.card.repository.VocabularyItemRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordBookmarkService {

    private final WordBookmarkRepository wordBookmarkRepository;
    private final UserRepository userRepository;
    private final VocabularyItemRepository vocabularyItemRepository;
    private static final Logger logger = LoggerFactory.getLogger(WordBookmarkService.class);
    // 단어 북마크 추가
    @Transactional
    public void addBookmark(String email, Long itemId) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        VocabularyItem item = vocabularyItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("VocabularyItem not found"));

        WordBookmark bookmark = new WordBookmark(user, item);
        wordBookmarkRepository.save(bookmark);
    }

    // 단어 북마크 삭제
    @Transactional
    public void removeBookmark(String email, Long itemId) {
        wordBookmarkRepository.findByUser_EmailAndVocabularyItem_ItemId(email, itemId)
                .ifPresent(wordBookmarkRepository::delete);
    }

    // 단어 북마크 토글 (추가 or 삭제)
//    @Transactional
//    public boolean toggleBookmark(String email, Long itemId) {
//        if (email == null || itemId == null) {
//            throw new IllegalArgumentException("Email or item ID cannot be null");
//        }
//
//        User user = userRepository.findById(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        VocabularyItem item = vocabularyItemRepository.findById(itemId)
//                .orElseThrow(() -> new RuntimeException("VocabularyItem not found"));
//
//        Optional<WordBookmark> existingBookmark = wordBookmarkRepository.findByUser_EmailAndVocabularyItem_ItemId(email, itemId);
//
//        if (existingBookmark.isPresent()) {
//            wordBookmarkRepository.delete(existingBookmark.get());
//            return false;  // 북마크 삭제됨
//        } else {
//            WordBookmark newBookmark = new WordBookmark(user, item);
//            wordBookmarkRepository.save(newBookmark);
//            return true;  // 북마크 추가됨
//        }
//    }
    @Transactional
    public boolean toggleBookmark(String email, Long itemId) {
        logger.info("Toggling bookmark for email: {} and itemId: {}", email, itemId);
        if (email == null || itemId == null) {
            throw new IllegalArgumentException("Email or item ID cannot be null");
        }

        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        VocabularyItem item = vocabularyItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("VocabularyItem not found"));

        Optional<WordBookmark> existingBookmark = wordBookmarkRepository.findByUser_EmailAndVocabularyItem_ItemId(email, itemId);

        if (existingBookmark.isPresent()) {
            wordBookmarkRepository.delete(existingBookmark.get());
            return false;  // 북마크 삭제됨
        } else {
            WordBookmark newBookmark = new WordBookmark(user, item);
            wordBookmarkRepository.save(newBookmark);
            return true;  // 북마크 추가됨
        }
    }

    // 사용자가 북마크한 단어 목록 조회
    @Transactional(readOnly = true)
    public List<VocabularyItemDTO> getUserBookmarks(String email) {
        List<WordBookmark> wordBookmarks = wordBookmarkRepository.findByUser_Email(email);
        return wordBookmarks
                .stream()
                .map(wordBookmark -> new VocabularyItemDTO(
                        wordBookmark.getVocabularyItem().getItemId(),
                        wordBookmark.getVocabularyItem().getCard().getCardNumber(),
                        wordBookmark.getVocabularyItem().getEnglishWord(),
                        wordBookmark.getVocabularyItem().getKoreanWord()
                ))
                .collect(Collectors.toList());
    }

    // 특정 단어가 북마크되었는지 확인
    @Transactional(readOnly = true)
    public boolean isWordBookmarked(String email, Long itemId) {
        return wordBookmarkRepository.findByUser_EmailAndVocabularyItem_ItemId(email, itemId)
                .isPresent();
    }
}