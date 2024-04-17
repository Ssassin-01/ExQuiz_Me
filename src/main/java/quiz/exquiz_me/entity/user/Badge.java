package quiz.exquiz_me.entity.user;

import jakarta.persistence.*;

@Entity
@Table(name = "badges")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Long badgeId;

    @Column(name = "badge_name")
    private String badgeName;

    @Column(name = "criteria", columnDefinition = "TEXT")
    private String criteria;

    @Column(name = "badge_type")
    private String badgeType;

    // Getters and setters
}
