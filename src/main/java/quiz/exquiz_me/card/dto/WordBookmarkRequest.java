package quiz.exquiz_me.card.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WordBookmarkRequest {
    private String email;
    private Long itemId;
}