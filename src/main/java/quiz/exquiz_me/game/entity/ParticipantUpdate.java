package quiz.exquiz_me.game.entity;

import java.util.Set;

public class ParticipantUpdate {

    private Long gameSessionId;
    private Set<String> participants;  // 참가자 이름 또는 식별자를 담는 컬렉션

    public ParticipantUpdate(Long gameSessionId, Set<String> participants) {
        this.gameSessionId = gameSessionId;
        this.participants = participants;
    }

    public Long getGameSessionId() {
        return gameSessionId;
    }

    public void setGameSessionId(Long gameSessionId) {
        this.gameSessionId = gameSessionId;
    }

    public Set<String> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<String> participants) {
        this.participants = participants;
    }
}
