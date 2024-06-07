//package quiz.exquiz_me;
//
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import quiz.exquiz_me.card.dto.VocabularyItemDTO;
//import quiz.exquiz_me.card.repository.VocabularyItemRepository;
//import quiz.exquiz_me.card.service.VocabularyItemService;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//
//@SpringBootTest
//public class VocabularyItemServiceTests {
//
//    @Autowired
//    private VocabularyItemService vocabularyItemService;
//
//    @MockBean
//    private VocabularyItemRepository vocabularyItemRepository;
//
//    @Test
//    @Transactional
//    public void testCreateVocabularyItem() {
//        VocabularyItemDTO newDTO = new VocabularyItemDTO(null, 1L, "Apple", "사과");
//
//        // repository의 save 메소드가 호출될 때 입력된 객체를 그대로 반환하도록 설정합니다.
//        when(vocabularyItemRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
//
//        // 서비스 메소드를 호출하여 VocabularyItem을 생성합니다.
//        VocabularyItemDTO createdDTO = vocabularyItemService.createVocabularyItem(newDTO);
//
//        assertNotNull(createdDTO, "Vocabulary Item DTO should not be null after saving");
//        assertEquals("Apple", createdDTO.getEnglishWord(), "English word should match");
//        assertEquals("사과", createdDTO.getKoreanWord(), "Korean word should match");
//    }
//}