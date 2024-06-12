package quiz.exquiz_me.game.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantUpdate {
    private Long gameSessionId;
    private String type;
    private String nickname;
    private Set<String> participants;

    // 추가: 필요한 생성자
    public ParticipantUpdate(Long gameSessionId, String type, Set<String> participants) {
        this.gameSessionId = gameSessionId;
        this.type = type;
        this.participants = participants;
    }
}