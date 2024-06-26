package quiz.exquiz_me.game.dto;

import lombok.Data;

@Data
public class GameParticipantDTO {
    private Long participantId;
    private Long sessionId;
    private String userId; // 사용자의 고유 식별자 또는 간단한 이름
    private Integer score;
    private Integer ranking;
}