package quiz.exquiz_me.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "game_sessions")
@Getter
@Setter
public class GameSessions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_session_id")
    private Long gameSessionId;

    @Column(name = "email")
    private String email;

    @Column(name = "card_number")
    private Long cardNumber;

    @Column(name = "player_count")
    private Integer playerCount;

    @Column(name = "question_count")
    private Integer questionCount;

    @Column(name = "timer")
    private Integer timer;

    @Column(name = "include_tf")
    private Boolean includeTF;

    @Column(name = "include_mc")
    private Boolean includeMC;

    @Column(name = "include_sa")
    private Boolean includeSA;

    @Column(name = "language")
    private String language;

    @Column(name = "qr_code")
    private String qrCode;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
