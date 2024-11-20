package quiz.exquiz_me.user.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Long subscriptionId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    @JsonBackReference
    private User user;

    // Assuming subscription_plan is a type of subscription rather than a date
    @Column(name = "subscription_plan")
    private String subscriptionPlan;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    // 결제 식별 키
    @Column(name = "paymentKey")
    private String paymentKey;

    // Getters and setters
}
