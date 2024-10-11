package quiz.exquiz_me.card.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.card.dto.CardAccessLogDTO;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.entity.CardAccessLog;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.card.repository.CardAccessLogRepository;
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
    private final CardAccessLogRepository cardAccessLogRepository;

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
                card.getUser().getNickname(),  // 닉네임 추가
                card.getTitle(),
                card.getWriteDateTime(),
                card.getCardTitleImage(),
                card.getPurpose(),
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
        card.setPurpose(cardDTO.getPurpose());
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

    @Transactional
    public CardDTO getCardByNumber(Long cardNumber) {
        Optional<Card> cardOptional = cardRepository.findById(cardNumber);
        if (cardOptional.isPresent()) {
            return convertToCardDTO(cardOptional.get()); // Card 엔티티를 CardDTO로 변환하여 반환
        } else {
            throw new IllegalArgumentException("Card with ID " + cardNumber + " not found.");
        }
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

    @Transactional
    public List<CardDTO> getRecentAccessedCardsByUserEmail(String email) {
        List<CardAccessLog> accessLogs = cardAccessLogRepository.findTop5ByUser_EmailOrderByAccessTimeDesc(email);

        return accessLogs.stream()
                .map(log -> {
                    Card card = log.getCard();
                    List<VocabularyItemDTO> vocabDTOs = card.getVocabularyItems().stream()
                            .map(vocabularyItem -> new VocabularyItemDTO(
                                    vocabularyItem.getItemId(),
                                    vocabularyItem.getCard().getCardNumber(),
                                    vocabularyItem.getEnglishWord(),
                                    vocabularyItem.getKoreanWord())
                            ).collect(Collectors.toList());

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
                            vocabDTOs // Vocabulary items added here
                    );
                })
                .collect(Collectors.toList());
    }
    //카드 열람
    @Transactional
    public void logCardAccess(String email, Long cardNumber) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Card card = cardRepository.findById(cardNumber)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        // 이미 동일한 카드 열람 기록이 있는지 확인
        Optional<CardAccessLog> existingLog = cardAccessLogRepository.findByUser_EmailAndCard_CardNumber(email, cardNumber);

        if (existingLog.isPresent()) {
            // 동일한 기록이 있으면 열람 시간을 업데이트
            CardAccessLog log = existingLog.get();
            log.setAccessTime(new Date()); // 최신 열람 시간으로 업데이트
            cardAccessLogRepository.save(log); // 업데이트된 열람 기록 저장
        } else {
            // 동일한 기록이 없으면 새로운 기록 추가
            CardAccessLog log = new CardAccessLog();
            log.setUser(user);
            log.setCard(card);
            log.setAccessTime(new Date());
            cardAccessLogRepository.save(log);
        }
    }

    @Transactional
    public void deleteCardByNumber(Long cardNumber) {
        if (!cardRepository.existsById(cardNumber)) {
            throw new IllegalArgumentException("Card with ID " + cardNumber + " not found.");
        }
        cardRepository.deleteById(cardNumber);
    }

    @Transactional
    public void updateCard(CardDTO cardDTO, Long cardNumber) {
        // 카드 가져오기
        Card card = cardRepository.findById(cardNumber)
                .orElseThrow(() -> new IllegalArgumentException("Card not found"));

        // 기존 vocabularyItems 삭제
        card.getVocabularyItems().clear();

        // 새로운 vocabularyItems 추가
        List<VocabularyItem> vocabularyItems = new ArrayList<>();
        for (VocabularyItemDTO vocabularyItemDTO : cardDTO.getVocabularyItems()) {
            VocabularyItem item = new VocabularyItem();
            item.setCard(card);
            item.setEnglishWord(vocabularyItemDTO.getEnglishWord());
            item.setKoreanWord(vocabularyItemDTO.getKoreanWord());
            vocabularyItems.add(item);
        }

        card.getVocabularyItems().addAll(vocabularyItems);

        // 나머지 필드 업데이트
        card.setTitle(cardDTO.getTitle());
        card.setCardContent(cardDTO.getCardContent());
        card.setPurpose(cardDTO.getPurpose());

        // 카드 저장
        cardRepository.save(card);
    }


}