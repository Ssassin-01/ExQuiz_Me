//package quiz.exquiz_me.user.entity;
//
//import jakarta.persistence.*;
//
//import java.time.LocalDate;
//
//
//@Entity
//@Table(name = "subscription")
//public class Subscription {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "subscription_id")
//    private Long subscriptionId;
//
//    @ManyToOne
//    @JoinColumn(name = "email", referencedColumnName = "email")
//    private User user;
//
//    // Assuming subscription_plan is a type of subscription rather than a date
//    @Column(name = "subscription_plan")
//    private String subscriptionPlan;
//
//    @Column(name = "purchase_date")
//    private LocalDate purchaseDate;
//
//    @Column(name = "expiration_date")
//    private LocalDate expirationDate;
//
//    // Getters and setters
//}
