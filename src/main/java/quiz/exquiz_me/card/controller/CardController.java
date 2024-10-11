package quiz.exquiz_me.card.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.dto.CardAccessLogDTO;
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
    public ResponseEntity<?> increaseViewCountAndLogAccess(@PathVariable Long cardNumber) {
        try {
            String email = getCurrentUserEmail(); // 현재 사용자 이메일 가져오기
            cardService.incrementCardView(cardNumber); // 조회수 증가
            cardService.logCardAccess(email, cardNumber); // 카드 열람 기록 저장

            // 증가된 조회수와 최신 카드 데이터 반환
            CardDTO updatedCard = cardService.getCardByNumber(cardNumber); // 조회수 업데이트 후 카드 정보 가져오기
            return ResponseEntity.ok(updatedCard); // 최신 카드 정보 반환
        } catch (Exception e) {
            logger.error("Error increasing view count or logging card access: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error increasing view count or logging card access");
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

    //최근학습
    @GetMapping("/recent")
    public ResponseEntity<List<CardDTO>> getRecentAccessedCards() {
        try {
            String email = getCurrentUserEmail();
            // CardAccessLogDTO 대신 CardDTO로 변경하여 최근 카드 데이터를 반환
            List<CardDTO> recentCards = cardService.getRecentAccessedCardsByUserEmail(email);
            return ResponseEntity.ok(recentCards);
        } catch (Exception e) {
            logger.error("Error retrieving recent accessed cards: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{cardNumber}")
    public ResponseEntity<?> deleteCard(@PathVariable Long cardNumber) {
        try {
            cardService.deleteCardByNumber(cardNumber);
            return ResponseEntity.ok("Card deleted successfully");
        } catch (Exception e) {
            logger.error("Error deleting card: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting card");
        }
    }

}
