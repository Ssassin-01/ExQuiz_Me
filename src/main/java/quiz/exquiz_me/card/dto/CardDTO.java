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
    private String nickname; // 닉네임 필드 추가
    private String title;
    private Date writeDateTime;
    private String cardTitleImage;
    private String purpose;
    private String cardContent;
    private Integer countView;
    private List<VocabularyItemDTO> vocabularyItems;
}
