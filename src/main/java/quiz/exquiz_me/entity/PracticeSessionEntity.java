package quiz.exquiz_me.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "practice_sessions")
public class PracticeSessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long sessionId;

    @Column(name = "email")
    private String email;

    @Column(name = "card_number")
    private Long cardNumber;

    @Column(name = "language")
    private String language;

    @Column(name = "include_tf")
    private Boolean includeTF;

    @Column(name = "include_mc")
    private Boolean includeMC;

    @Column(name = "include_sa")
    private Boolean includeSA;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

}
