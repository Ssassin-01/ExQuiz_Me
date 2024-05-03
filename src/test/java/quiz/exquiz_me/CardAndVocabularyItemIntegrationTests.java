package quiz.exquiz_me;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.service.CardService;
import quiz.exquiz_me.card.service.VocaCardService;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
public class CardAndVocabularyItemIntegrationTests {

    @Autowired
    private VocaCardService cardService;

    @Test
    public void testCreateCard() {
        List<VocabularyItemDTO> vocabItems = Arrays.asList(
                new VocabularyItemDTO(null, null, "Apple", "사과"),
                new VocabularyItemDTO(null, null, "Banana", "바나나")
        );

        CardDTO newCardDTO = new CardDTO(null, "abcd@gmail.com", "Learn Fruits", new Date(), "http://example.com/fruits.jpg", "Description of fruits card", 0, vocabItems);
        CardDTO savedCardDTO = cardService.createCard(newCardDTO);

        assertNotNull(savedCardDTO);
        assertNotNull(savedCardDTO.getCardNumber());
        assertEquals("Learn Fruits", savedCardDTO.getTitle());

    }
}