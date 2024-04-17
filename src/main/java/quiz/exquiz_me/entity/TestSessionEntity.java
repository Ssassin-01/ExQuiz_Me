package quiz.exquiz_me.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_session")
public class TestSessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_session_id")
    private Long testSessionId;

    @Column(name = "email")
    private String email;

    @Column(name = "card_number")
    private Long cardNumber;

    @Column(name = "language")
    private String language;

    @Column(name = "include_tf")
    private Boolean includeTf;

    @Column(name = "include_mc")
    private Boolean includeMc;

    @Column(name = "include_sa")
    private Boolean includeSa;

    @Column(name = "question_count")
    private Integer questionCount;

    @Column(name = "timer")
    private Integer timer;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;
}
