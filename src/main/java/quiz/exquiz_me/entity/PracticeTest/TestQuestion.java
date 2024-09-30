//package quiz.exquiz_me.entity.PracticeTest;
//
//import jakarta.persistence.*;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "test_questions")
//public class TestQuestion {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "test_question_id")
//    private Long testQuestionId;
//
//    @ManyToOne
//    @JoinColumn(name = "test_session_id", referencedColumnName = "test_session_id")
//    private TestSession testSession;
//
//    @Column(name = "question_type")
//    private String questionType;
//
//    @Column(name = "question_id")
//    private Integer questionId;
//
//    @Column(name = "user_response")
//    private String userResponse;
//
//    @Column(name = "is_correct")
//    private Boolean isCorrect;
//
//    @Column(name = "answered_time")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date answeredTime;
//
//    // Getters and setters
//}