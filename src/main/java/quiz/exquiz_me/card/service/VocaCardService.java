package quiz.exquiz_me.card.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.card.repository.CardRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VocaCardService {
    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    //entity -> DTO로 변환시켜주는 놈
    //이 방법은 데이터 캡슐화와 API 클라이언트가 구조화되고 제어된 형식으로 데이터를 수신하도록 보장하고 네트워크를 통해
    // 전송되는 내용에서 내부 엔터티 표현을 분리하는 데 필수적입니다. 이 패턴은 도메인 모델이 외부 인터페이스에 가장 유용하거나
    // 안전한 모델과 직접적으로 일치하지 않을 수 있는 복잡한 시스템에서 특히 유용
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

        // Create the card object that is effectively final for use in the lambda
        final Card card = new Card();
        card.setUser(user);
        card.setTitle(cardDTO.getTitle());
        card.setWriteDateTime(new Date());
        card.setCardTitleImage(cardDTO.getCardTitleImage());
        card.setCardContent(cardDTO.getCardContent());
        card.setCountView(cardDTO.getCountView());

        // Handling vocabulary items directly through Card
        List<VocabularyItem> vocabularyItems = cardDTO.getVocabularyItems().stream()
                .map(itemDTO -> {
                    VocabularyItem item = new VocabularyItem();
                    item.setCard(card);  // This should link back to the managed card entity
                    item.setEnglishWord(itemDTO.getEnglishWord());
                    item.setKoreanWord(itemDTO.getKoreanWord());
                    return item;
                }).collect(Collectors.toList());

        card.getVocabularyItems().addAll(vocabularyItems);  // Make sure changes are recognized
        cardRepository.save(card);

        return convertToCardDTO(card);
    }


}
