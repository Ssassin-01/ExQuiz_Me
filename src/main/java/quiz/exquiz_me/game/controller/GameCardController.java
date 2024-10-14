package quiz.exquiz_me.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.game.repository.GameVocabularyItemRepository;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/game/card")
public class GameCardController {

    @Autowired
    private GameVocabularyItemRepository gameVocabularyItemRepository;

    @GetMapping("/{cardNumber}/items")
    public List<VocabularyItemDTO> getCardItems(@PathVariable Long cardNumber) {
        List<VocabularyItem> items = gameVocabularyItemRepository.findByCardCardNumber(cardNumber);
        return items.stream()
                .map(item -> new VocabularyItemDTO(
                        item.getItemId(),
                        cardNumber,
                        item.getEnglishWord(),
                        item.getKoreanWord()
                ))
                .collect(Collectors.toList());
    }
}