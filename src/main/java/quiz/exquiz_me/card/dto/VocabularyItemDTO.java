package quiz.exquiz_me.card.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyItemDTO {
    private Long itemId;
    private Long cardNumber;
    private String englishWord;
    private String koreanWord;
}
