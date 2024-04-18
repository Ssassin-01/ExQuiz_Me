package quiz.exquiz_me.entity.card;


import jakarta.persistence.*;
import quiz.exquiz_me.entity.user.User;

import java.util.Date;

@Entity
@Table(name = "card_access_logs")
public class CardAccessLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

    @Column(name = "access_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date accessTime;

    // Getters and setters
}