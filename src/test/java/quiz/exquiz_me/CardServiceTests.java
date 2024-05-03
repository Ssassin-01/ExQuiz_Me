package quiz.exquiz_me;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.service.CardService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CardServiceTests {

    @Autowired
    private CardService cardService;

    //카드 생성하기
    @Test
    //@Transactional
    public void testCreateCard() {
        List<VocabularyItemDTO> vocabularyItems = new ArrayList<>();
        CardDTO newCardDTO = new CardDTO(null, "abcd@gmail.com", "Introduction to Java", new Date(), "http://example.com/image.jpg", "Learn Java Basics", 0, vocabularyItems);
        CardDTO savedCardDTO = cardService.createCard(newCardDTO);

        assertNotNull(savedCardDTO, "Card DTO null 이라는데??");
        assertEquals("Introduction to Java", savedCardDTO.getTitle(), "타이틀이 일치하지 않는군");
        assertNotNull(savedCardDTO.getCardNumber(), "Card number should not be null after being generated");
    }

    //카드 수정하기
    @Test
    @Transactional
    public void testUpdateCard() {
        List<VocabularyItemDTO> vocabularyItems = new ArrayList<>();
        CardDTO updateCardDTO = new CardDTO(null, "user@example.com", "Advanced Java", new Date(), "http://example.com/newimage.jpg", "Learn Advanced Java Concepts", 10, vocabularyItems);
        CardDTO updatedCardDTO = cardService.updateCard(1L, updateCardDTO);

        assertNotNull(updatedCardDTO, "Card DTO should not be null after update");
        assertEquals("Advanced Java", updatedCardDTO.getTitle(), "Title should be updated");
    }

    //특정 이메일 갖는 사람 수정하기
    @Test
    //@Transactional
    public void testUpdateCardByEmail() {
        List<VocabularyItemDTO> vocabularyItems = new ArrayList<>();
        String email = "abcd@gmail.com";
        CardDTO updateCardDTO = new CardDTO(null, email, "Updated Java", null, "http://example.com/updated_image.jpg", "Learn advanced Java concepts", 0, vocabularyItems);
        CardDTO updatedCardDTO = cardService.updateCardByEmail(email, updateCardDTO);

        assertNotNull(updatedCardDTO, "Updated Card DTO should not be null");
        //assertEquals("Advanced Java", updatedCardDTO.getTitle(), "Card title should be updated to 'Advanced Java'");
        assertEquals("Learn advanced Java concepts", updatedCardDTO.getCardContent(), "Card content should be updated");
    }


    //카드 삭제하기
    @Test
    @Transactional
    public void testDeleteCardsByEmail() {
        String email = "abcd@gmail.com";
        try {
            cardService.deleteCardsByEmail(email);
            assertTrue(true, "Cards successfully deleted");
        } catch (RuntimeException ex) {
            fail("Should not throw exception if cards are present");
        }
    }

    //카드 아이디 찾기
    @Test
    @Transactional
    public void testGetCardsByEmail() {
        String userEmail = "abcd@gmail.com";
        List<CardDTO> foundCards = cardService.getCardsByEmail(userEmail);

        // Assertions
        assertNotNull(foundCards, "Card list should not be null when found");
        assertFalse(foundCards.isEmpty(), "Card list should not be empty");
        assertEquals(userEmail, foundCards.get(0).getUserEmail(), "Email should match the card owner's email");
    }


}