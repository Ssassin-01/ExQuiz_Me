package quiz.exquiz_me.user.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profile_option")
public class ProfileOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "description")
    private String description;

    // Getters and setters
}