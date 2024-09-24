package quiz.exquiz_me.card.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.entity.CardBookmark;
import quiz.exquiz_me.card.repository.CardBookmarkRepository;
import quiz.exquiz_me.card.repository.CardRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardBookmarkService {
    private final CardBookmarkRepository cardBookmarkRepository;
    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    // 북마크 추가
    @Transactional
    public void addBookmark(String userEmail, Long cardNumber) {
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Card card = cardRepository.findById(cardNumber)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        CardBookmark bookmark = new CardBookmark(user, card);
        cardBookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    @Transactional
    public void removeBookmark(String userEmail, Long cardNumber) {
        cardBookmarkRepository.findByUser_EmailAndCard_CardNumber(userEmail, cardNumber)
                .ifPresent(cardBookmarkRepository::delete);
    }

    // 북마크 토글 (추가 or 삭제)
    @Transactional
    public boolean toggleBookmark(String userEmail, Long cardNumber) {
        if (userEmail == null || cardNumber == null) {
            throw new IllegalArgumentException("User email or card number cannot be null");
        }

        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Card card = cardRepository.findById(cardNumber)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        Optional<CardBookmark> existingBookmark = cardBookmarkRepository.findByUser_EmailAndCard_CardNumber(userEmail, cardNumber);

        if (existingBookmark.isPresent()) {
            cardBookmarkRepository.delete(existingBookmark.get());
            return false;  // 북마크 삭제됨
        } else {
            CardBookmark newBookmark = new CardBookmark(user, card);
            cardBookmarkRepository.save(newBookmark);
            return true;  // 북마크 추가됨
        }
    }


    // 사용자가 북마크한 카드 목록 조회
    public List<CardDTO> getUserBookmarks(String userEmail) {
        List<CardBookmark> bookmarks = cardBookmarkRepository.findByUser_Email(userEmail);
        return bookmarks.stream()
                .map(bookmark -> {
                    Card card = bookmark.getCard();
                    return new CardDTO(
                            card.getCardNumber(),
                            card.getUser().getEmail(),
                            card.getUser().getNickname(),
                            card.getTitle(),
                            card.getWriteDateTime(),
                            card.getCardTitleImage(),
                            card.getPurpose(),
                            card.getCardContent(),
                            card.getCountView(),
                            card.getVocabularyItems().stream()
                                    .map(vocabItem -> new VocabularyItemDTO(
                                            vocabItem.getItemId(),
                                            vocabItem.getCard().getCardNumber(),
                                            vocabItem.getEnglishWord(),
                                            vocabItem.getKoreanWord()))
                                    .collect(Collectors.toList())
                    );
                })
                .collect(Collectors.toList());
    }

    // 특정 카드가 북마크되었는지 확인
    public boolean isCardBookmarked(String userEmail, Long cardNumber) {
        return cardBookmarkRepository.findByUser_EmailAndCard_CardNumber(userEmail, cardNumber)
                .isPresent();
    }
}
