package quiz.exquiz_me.card.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {
    private Long cardNumber;
    private String userEmail;
    private String title;
    private Date writeDateTime;
    private String cardTitleImage;
    private String cardContent;
    private Integer countView;
    private List<VocabularyItemDTO> vocabularyItems;
}
