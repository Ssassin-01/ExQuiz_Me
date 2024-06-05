package quiz.exquiz_me.card.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.card.repository.VocabularyItemRepository;

@Service
public class VocabularyItemService {
    @Autowired
    private VocabularyItemRepository vocabularyItemRepository;

    public VocabularyItemDTO createVocabularyItem(VocabularyItemDTO dto) {
        VocabularyItem item = new VocabularyItem(null, null, dto.getEnglishWord(), dto.getKoreanWord());  // Assume Card is handled separately or already set
        item = vocabularyItemRepository.save(item);
        return new VocabularyItemDTO(item.getItemId(), item.getCard().getCardNumber(), item.getEnglishWord(), item.getKoreanWord());
    }

    // Additional methods like update, findById can be added here
}
