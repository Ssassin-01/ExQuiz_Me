package quiz.exquiz_me.game;

import jakarta.persistence.*;
import quiz.exquiz_me.user.entity.User;

@Entity
@Table(name = "game_participants")
public class GameParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id")
    private Long participantId;

    @ManyToOne
    @JoinColumn(name = "game_session_id", referencedColumnName = "game_session_id")
    private GameSessions gameSessions;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @Column(name = "score")
    private Integer score;

    @Column(name = "ranking")
    private Integer ranking;

    // Getters and setters
}