package quiz.exquiz_me.card.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.repository.CardRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private UserRepository userRepository;

    //CardEntity to CardDTO
    private CardDTO convertToCardDTO(Card card) {
        return new CardDTO(
                card.getCardNumber(),
                card.getUser().getEmail(),
                card.getTitle(),
                card.getWriteDateTime(),
                card.getCardTitleImage(),
                card.getCardContent(),
                card.getCountView(),
                null  // No vocabulary items to handle
        );
    }

    //카드 생성
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

        card = cardRepository.save(card);  // Save the card

        return convertToCardDTO(card);
    }
    //Card 수정
    public CardDTO updateCard(Long cardNumber, CardDTO cardDTO) {
        Card card = cardRepository.findById(cardNumber)
                .orElseThrow(() -> new RuntimeException("Card not found with number: " + cardNumber));

        card.setTitle(cardDTO.getTitle());
        card.setWriteDateTime(cardDTO.getWriteDateTime() != null ? cardDTO.getWriteDateTime() : new Date());
        card.setCardTitleImage(cardDTO.getCardTitleImage());
        card.setCardContent(cardDTO.getCardContent());
        card.setCountView(cardDTO.getCountView());

        card = cardRepository.save(card);
        return convertToCardDTO(card);
    }

    //특정 이메일 값 넣어 수정
    public CardDTO updateCardByEmail(String userEmail, CardDTO cardDTO) {
        List<Card> cards = cardRepository.findByUser_Email(userEmail);

        // Check for no cards or multiple cards and handle accordingly
        if (cards.isEmpty()) {
            throw new RuntimeException("No card found for user with email: " + userEmail);
        }
        if (cards.size() > 1) {
            throw new RuntimeException("Multiple cards found for user with email: " + userEmail);
        }

        // Update the card since only one is expected
        Card card = cards.get(0);
        updateCardFields(card, cardDTO);

        Card updatedCard = cardRepository.save(card);
        return convertToCardDTO(updatedCard);
    }

    // Helper method to update the fields of the card from the CardDTO
    private void updateCardFields(Card card, CardDTO cardDTO) {
        card.setTitle(cardDTO.getTitle());
        card.setCardContent(cardDTO.getCardContent());
        card.setWriteDateTime(cardDTO.getWriteDateTime() != null ? cardDTO.getWriteDateTime() : new Date());
        card.setCardTitleImage(cardDTO.getCardTitleImage());
        card.setCountView(cardDTO.getCountView());
    }

    //Card 삭제
    public void deleteCardsByEmail(String email) {
        List<Card> cards = cardRepository.findByUser_Email(email);
        if (cards.isEmpty()) {
            throw new RuntimeException("No cards found for user with email: " + email);
        }
        cardRepository.deleteAll(cards);
    }
    //Card 찾기
    public List<CardDTO> getCardsByEmail(String userEmail) {
        List<Card> cards = cardRepository.findByUser_Email(userEmail);
        return cards.stream()
                .map(this::convertToCardDTO)
                .collect(Collectors.toList());
    }



}
