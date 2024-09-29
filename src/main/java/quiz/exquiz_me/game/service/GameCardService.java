//package quiz.exquiz_me.game.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import quiz.exquiz_me.card.entity.VocabularyItem;
//import quiz.exquiz_me.game.repository.GameCardRepository;
//
//import java.util.List;
//
//@Service
//public class GameCardService {
//
//    @Autowired
//    private GameCardRepository cardRepository;
//
//    public List<VocabularyItem> getVocabularyItems(Long cardId) {
//        return cardRepository.findById(cardId)
//                .map(card -> card.getVocabularyItems())
//                .orElseThrow(() -> new RuntimeException("Card not found"));
//    }
//}