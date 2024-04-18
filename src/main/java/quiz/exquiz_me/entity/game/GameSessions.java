package quiz.exquiz_me.entity.game;

import jakarta.persistence.*;
import quiz.exquiz_me.entity.card.Card;
import quiz.exquiz_me.entity.user.User;

import java.util.Date;

@Entity
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

    // Getters and setters
}
