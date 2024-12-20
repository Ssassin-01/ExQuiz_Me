package quiz.exquiz_me.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.user.entity.Subscription;
import quiz.exquiz_me.user.entity.User;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUser_Email(String email);
    List<Subscription> findByUser(User user);
}