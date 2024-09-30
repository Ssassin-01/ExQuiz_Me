//package quiz.exquiz_me.user.entity;
//
//import jakarta.persistence.*;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "user_profile")
//public class UserProfile {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_profile_id")
//    private Long userProfileId;
//
//    @ManyToOne
//    @JoinColumn(name = "email", referencedColumnName = "email")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "profile_id", referencedColumnName = "profile_id")
//    private ProfileOption profileOption;
//
//    @Column(name = "custom_image_URL")
//    private String customImageURL;
//
//    @Column(name = "selection_date")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date selectionDate;
//
//    // Getters and setters
//}