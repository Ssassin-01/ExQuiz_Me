package quiz.exquiz_me.game.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameMessage {
    private String text;          // 메시지 본문
    private String nickname;      // 닉네임 (플레이어)
    private String questionType;  // 질문 유형 (OX, Four, Short Answer 등)
    private String message;       // 추가 메시지 (게임 시작, 종료 등)
    private Long gameSessionId;   // 게임 세션 ID (추가)
}
