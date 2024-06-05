package quiz.exquiz_me.card.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.service.VocaCardService;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    private final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private VocaCardService cardService;

    @PostMapping
    public ResponseEntity<?> createCard(@RequestBody CardDTO cardDTO) {
        //ResponseEntity => HTTP 응답에 풍부한 정보를 반환할 수 있도록 하는 놈
        try {
            logger.info("Received card data: {}", cardDTO);
            System.out.println("Email: " + cardDTO.getUserEmail());
            System.out.println("Title: " + cardDTO.getTitle());
            System.out.println("Content: " + cardDTO.getCardContent());
            System.out.println("View Count: " + cardDTO.getCountView());
            CardDTO createdCard = cardService.createCard(cardDTO);
            return ResponseEntity.ok(createdCard);
        } catch (Exception e) {
            logger.error("Error creating card: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating card");
        }
    }
}