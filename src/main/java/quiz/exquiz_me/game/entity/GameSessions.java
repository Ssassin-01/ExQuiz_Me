package quiz.exquiz_me.game.entity;

import jakarta.persistence.*;
import lombok.*;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.game.dto.GameParticipantDTO;
import quiz.exquiz_me.user.entity.User;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "game_sessions")
public class GameSessions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_session_id")
    private Long gameSessionId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

    @Column(name = "player_count")
    private Integer playerCount;

    @Column(name = "question_count")
    private Integer questionCount;

    @Column(name = "timer")
    private Integer timer;

    @Column(name = "include_tf")
    private Boolean includeTf;

    @Column(name = "include_mc")
    private Boolean includeMc;

    @Column(name = "include_sa")
    private Boolean includeSa;

    @Column(name = "language")
    private String language;

    @Column(name = "qr_code", columnDefinition = "TEXT")
    private String qrCode;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // 이 필드는 JPA에서 관리되지 않으며, 메모리에서만 관리됩니다.
    @Transient // JPA가 관리하지 않는 필드임을 명시
    private Set<GameParticipantDTO> participants = new HashSet<>();

    // 참가자 추가 메서드
    public void addParticipant(GameParticipantDTO participant) {
        participants.add(participant);
    }

    // 참가자 삭제 메서드
    public void removeParticipant(GameParticipantDTO participant) {
        participants.remove(participant);
    }

    // 참가자 수 반환
    public int getParticipantCount() {
        return participants.size();
    }
}

