package quiz.exquiz_me.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "practice_attempts")
public class PracticeAttemptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Long attemptId;

    @Column(name = "session_id")
    private Long sessionId;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "user_response")
    private String userResponse;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "attempt_time")
    private LocalDateTime attemptTime;
}
