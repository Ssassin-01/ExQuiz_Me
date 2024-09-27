package quiz.exquiz_me.card.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardAccessLogDTO {
    private Long logId;
    private String userEmail;
    private Long cardNumber;
    private String cardTitle;
    private String purpose;  // 새로운 필드 추가
    private Date accessTime;
    private String nickname;  // 작성자 닉네임 추가
    private Date writeDateTime;
}