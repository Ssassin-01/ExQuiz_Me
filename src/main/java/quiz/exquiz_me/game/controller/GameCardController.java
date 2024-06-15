package quiz.exquiz_me.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.game.repository.GameVocabularyItemRepository;
import quiz.exquiz_me.game.service.GameCardService;


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
                .map(item -> new VocabularyItemDTO(item.getItemId(), item.getEnglishWord(), item.getKoreanWord()))
                .collect(Collectors.toList());
    }

    private static class VocabularyItemDTO {
        private Long itemId;
        private String englishWord;
        private String koreanWord;

        public VocabularyItemDTO(Long itemId, String englishWord, String koreanWord) {
            this.itemId = itemId;
            this.englishWord = englishWord;
            this.koreanWord = koreanWord;
        }

        // getters
        public Long getItemId() {
            return itemId;
        }

        public String getEnglishWord() {
            return englishWord;
        }

        public String getKoreanWord() {
            return koreanWord;
        }
    }
}