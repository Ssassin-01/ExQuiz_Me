package quiz.exquiz_me.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.exquiz_me.repository.SubscriptionRepository;
import quiz.exquiz_me.user.entity.Subscription;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.time.LocalDate;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void createSubscription(String email, String planName) {
        try {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found: " + email);
            }

            Subscription subscription = new Subscription();
            subscription.setUser(user);
            subscription.setSubscriptionPlan(planName);
            subscription.setPurchaseDate(LocalDate.now());
            subscription.setExpirationDate(LocalDate.now().plusMonths(1));

            subscriptionRepository.save(subscription);

            System.out.println("Subscription successfully saved for user: " + email);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error while saving subscription for user: " + email + " with error: " + e.getMessage());
        }
    }

}