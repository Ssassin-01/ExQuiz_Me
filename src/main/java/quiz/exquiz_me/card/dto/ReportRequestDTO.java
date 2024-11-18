package quiz.exquiz_me.card.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequestDTO {
    private Long cardNumber;  // 신고 대상 카드 번호

    private String reason;    // 신고 사유
    private String details;   // 신고 세부 내용
}