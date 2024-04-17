package quiz.exquiz_me.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscription")
@Getter
@Setter
public class SubscriptionEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "subscription_id")
        private Long subscriptionId;

        @Column(name = "email")
        private String email;

        @Column(name = "subscription_plan")
        private LocalDate subscriptionPlan;

        @Column(name = "purchase_date")
        private LocalDateTime purchaseDate;

        @Column(name = "expiration_date")
        private LocalDateTime expirationDate;

}
