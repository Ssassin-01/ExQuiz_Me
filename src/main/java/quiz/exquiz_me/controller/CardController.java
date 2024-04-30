package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.entity.card.Card;
import quiz.exquiz_me.repository.CardRepository;

import java.util.List;

// json 방식
@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "http://localhost:3000") // react cors 에러 해결
public class CardController {
    private final CardRepository cardRepository;
    @Autowired
    public CardController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
    @GetMapping
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }
}