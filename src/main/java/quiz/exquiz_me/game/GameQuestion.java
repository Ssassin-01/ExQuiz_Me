package quiz.exquiz_me.game;

import jakarta.persistence.*;

@Entity
public class GameQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameQuestionId;

    @ManyToOne
    @JoinColumn(name = "game_session_id", referencedColumnName = "game_session_id")
    private GameSessions gameSession;

    private String questionType;
    private Integer questionId;
    private Integer round;

    // Getters and Setters
}