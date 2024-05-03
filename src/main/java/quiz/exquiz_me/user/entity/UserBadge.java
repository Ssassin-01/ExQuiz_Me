package quiz.exquiz_me.user.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "user_badges")
public class UserBadge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_badge_id")
    private Long userBadgeId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "badge_id", referencedColumnName = "badge_id")
    private Badge badge;

    @Column(name = "acquired_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date acquiredDate;

    // Getters and setters
}