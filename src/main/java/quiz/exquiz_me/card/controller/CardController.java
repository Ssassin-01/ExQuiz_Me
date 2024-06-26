package quiz.exquiz_me.card.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.service.VocaCardService;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    private final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private VocaCardService cardService;

    @PostMapping
    public ResponseEntity<?> createCard(@RequestBody CardDTO cardDTO) {
        try {
            logger.info("Received card data: {}", cardDTO);
            CardDTO createdCard = cardService.createCard(cardDTO);
            return ResponseEntity.ok(createdCard);
        } catch (Exception e) {
            logger.error("Error creating card: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating card");
        }
    }

    @GetMapping
    public ResponseEntity<List<CardDTO>> getAllCards() {
        try {
            List<CardDTO> cards = cardService.getAllCards();
            return ResponseEntity.ok(cards);
        } catch (Exception e) {
            logger.error("Error retrieving cards: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    // 조회수 증가 엔드포인트
    @PostMapping("/{cardNumber}/view")
    public ResponseEntity<?> increaseViewCount(@PathVariable Long cardNumber) {
        try {
            cardService.incrementCardView(cardNumber);
            return ResponseEntity.ok().build(); // 조회수만 증가시키므로 빈 응답 반환
        } catch (Exception e) {
            logger.error("Error increasing view count: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error increasing view count");
        }
    }
    // 조회수가 높은 순으로 카드 반환 엔드포인트
    @GetMapping("/popular")
    public ResponseEntity<List<CardDTO>> getPopularCards() {
        try {
            List<CardDTO> popularCards = cardService.getPopularCards();
            return ResponseEntity.ok(popularCards);
        } catch (Exception e) {
            logger.error("Error retrieving popular cards: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/user")
    public ResponseEntity<List<CardDTO>> getUserCards() {
        try {
            // 현재 인증된 사용자의 이메일을 가져옴
            String email = getCurrentUserEmail();
            List<CardDTO> userCards = cardService.getUserCardsByEmail(email);
            return ResponseEntity.ok(userCards);
        } catch (Exception e) {
            logger.error("Error retrieving user's cards: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String getCurrentUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }
}
