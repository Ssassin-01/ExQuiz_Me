package quiz.exquiz_me.entity.PracticeTest;

import jakarta.persistence.*;

@Entity
public class PracticeAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attemptId;

    @ManyToOne
    @JoinColumn(name = "session_id", referencedColumnName = "session_id")
    private PracticeSession practiceSession;

    private String questionType;
    private Integer questionId;
    private String userResponse;
    private Boolean isCorrect;

    // Getters and Setters
}