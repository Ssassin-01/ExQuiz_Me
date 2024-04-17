package quiz.exquiz_me.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_questions")
public class TestQuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_question_id")
    private Long testQuestionId;

    @Column(name = "test_session_id")
    private Long testSessionId;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "user_response")
    private String userResponse;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "answered_time")
    private LocalDateTime answeredTime;

}
