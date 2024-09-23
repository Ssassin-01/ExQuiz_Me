package quiz.exquiz_me.card.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkRequest {
    private String userEmail;
    private Long cardNumber;

    public BookmarkRequest() {}  // 기본 생성자 추가
}
