package quiz.exquiz_me.game.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameParticipantDTO {
    private Long participantId;
    private Long sessionId;
    private String userId;
    private String nickname; // 게임 내에서 사용할 닉네임// 사용자의 고유 식별자 또는 간단한 이름
    private Integer score;
    private Integer ranking;
}