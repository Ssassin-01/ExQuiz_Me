package quiz.exquiz_me.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.exquiz_me.repository.SubscriptionRepository;
import quiz.exquiz_me.user.entity.Subscription;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public void createSubscription(String email, String planName, String paymentKey) {
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
            subscription.setPaymentKey(paymentKey);

            subscriptionRepository.save(subscription);

            System.out.println("Subscription successfully saved for user: " + email);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error while saving subscription for user: " + email + " with error: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public boolean isUserSubscribed(User user) {
        List<Subscription> subscriptions = subscriptionRepository.findByUser_Email(user.getEmail());
        return subscriptions.stream().anyMatch(subscription ->
                subscription.getExpirationDate().isAfter(LocalDate.now()));
    }

    @Transactional(readOnly = true)
    public List<Subscription> getSubscriptionsByEmail(String email) {
        return subscriptionRepository.findByUser_Email(email);
    }
    @Transactional(readOnly = true)
    public Optional<Subscription> getActiveSubscriptionByEmail(String email) {
        List<Subscription> subscriptions = subscriptionRepository.findByUser_Email(email);
        return subscriptions.stream()
                .filter(subscription -> subscription.getExpirationDate().isAfter(LocalDate.now()))
                .findFirst();
    }
    @Transactional
    public boolean cancelSubscription(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found: " + email);
        }

        Optional<Subscription> activeSubscription = getActiveSubscriptionByEmail(email);
        if (activeSubscription.isPresent()) {
            subscriptionRepository.delete(activeSubscription.get()); // 데이터 삭제
            return true;
        } else {
            return false;
        }
    }
}
