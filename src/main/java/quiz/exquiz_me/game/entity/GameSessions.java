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

    // 참가자 목록을 메모리에서 관리하기 위해 Set으로 변경
    // 참가자 목록을 데이터베이스와 연동하여 관리
    @OneToMany(mappedBy = "gameSessions", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<GameParticipant> participants = new HashSet<>();

    public void addParticipant(GameParticipant participant) {
        participants.add(participant);
        participant.setGameSessions(this); // 양방향 관계 설정
    }

    public void removeParticipant(GameParticipant participant) {
        participants.remove(participant);
        participant.setGameSessions(null);
    }

    public int getParticipantCount() {
        return participants.size();
    }
}
