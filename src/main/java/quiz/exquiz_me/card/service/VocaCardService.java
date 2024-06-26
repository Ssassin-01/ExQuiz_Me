package quiz.exquiz_me.card.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.card.repository.CardRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VocaCardService {
    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    private CardDTO convertToCardDTO(Card card) {
        List<VocabularyItemDTO> vocabDTOs = card.getVocabularyItems().stream()
                .map(vi -> new VocabularyItemDTO(
                        vi.getItemId(),
                        vi.getCard().getCardNumber(),
                        vi.getEnglishWord(),
                        vi.getKoreanWord())
                )
                .collect(Collectors.toList());
        return new CardDTO(
                card.getCardNumber(),
                card.getUser().getEmail(),
                card.getTitle(),
                card.getWriteDateTime(),
                card.getCardTitleImage(),
                card.getCardContent(),
                card.getCountView(),
                vocabDTOs
        );
    }

    @Transactional
    public CardDTO createCard(CardDTO cardDTO) {
        User user = userRepository.findById(cardDTO.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Card card = new Card();
        card.setUser(user);
        card.setTitle(cardDTO.getTitle());
        card.setWriteDateTime(new Date());
        card.setCardTitleImage(cardDTO.getCardTitleImage());
        card.setCardContent(cardDTO.getCardContent());
        card.setCountView(cardDTO.getCountView());

        List<VocabularyItem> vocabularyItems = new ArrayList<>();
        for (VocabularyItemDTO vocabularyItemDTO : cardDTO.getVocabularyItems()) {
            VocabularyItem item = new VocabularyItem();
            item.setCard(card);
            item.setEnglishWord(vocabularyItemDTO.getEnglishWord());
            item.setKoreanWord(vocabularyItemDTO.getKoreanWord());
            VocabularyItem apply = item;
            vocabularyItems.add(apply);
        }

        card.getVocabularyItems().addAll(vocabularyItems);
        cardRepository.save(card);
        return convertToCardDTO(card);
    }
    // 모든 카드 반환
    @Transactional
    public List<CardDTO> getAllCards() {
        List<Card> cards = cardRepository.findAll();
        return cards.stream()
                .map(this::convertToCardDTO)
                .collect(Collectors.toList());
    }
    // 조회수 증가 메서드
    @Transactional
    public void incrementCardView(Long cardNumber) {
        Optional<Card> cardOptional = cardRepository.findById(cardNumber);
        if (cardOptional.isPresent()) {
            Card card = cardOptional.get();
            card.setCountView(card.getCountView() + 1); // 조회 수 증가
            cardRepository.save(card);
        } else {
            throw new IllegalArgumentException("Card with ID " + cardNumber + " not found.");
        }
    }
    // 조회수가 높은 순으로 카드 반환
    @Transactional
    public List<CardDTO> getPopularCards() {
        List<Card> cards = cardRepository.findAll();
        return cards.stream()
                .sorted((c1, c2) -> c2.getCountView().compareTo(c1.getCountView()))
                .map(this::convertToCardDTO)
                .collect(Collectors.toList());
    }
    // 카드 title로 검색
    @Transactional
    public List<CardDTO> getCardsByTitle(String title) {
        List<Card> cards = cardRepository.findByTitleContaining(title);
        return cards.stream()
                .map(this::convertToCardDTO)
                .collect(Collectors.toList());
    }
    @Transactional
    public List<CardDTO> getUserCardsByEmail(String email) {
        List<Card> userCards = cardRepository.findByUser_Email(email);
        return userCards.stream()
                .map(this::convertToCardDTO)
                .collect(Collectors.toList());
    }
}