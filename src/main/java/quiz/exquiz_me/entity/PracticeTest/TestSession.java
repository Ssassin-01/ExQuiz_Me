package quiz.exquiz_me.entity.PracticeTest;

import jakarta.persistence.*;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.user.entity.User;

import java.util.Date;

@Entity
@Table(name = "test_sessions")
public class TestSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_session_id")
    private Long testSessionId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

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
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;

    @Column(name = "end_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;

    // Getters and setters
}