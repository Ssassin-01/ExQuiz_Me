package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.repository.SubscriptionRepository;
import quiz.exquiz_me.service.SubscriptionService;
import quiz.exquiz_me.user.entity.Subscription;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.service.UserService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class SubscribeController {
    @Autowired
    private UserService userService;
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/pay")
    public ResponseEntity<Map<String, Object>> pay(@RequestBody Map<String, String> request) {
        String planName = request.get("planName");
        String amount = request.get("amount");
        String userEmail = request.get("userEmail"); // 현재 사용자의 이메일

        Map<String, Object> response = new HashMap<>();

        try {
            User user = userService.findByEmail(userEmail);
            if (user == null) {
                throw new RuntimeException("User not found: " + userEmail);
            }

            // 이미 구독 중인지 확인
            if (subscriptionService.isUserSubscribed(user)) {
                response.put("status", "fail");
                response.put("message", "User is already subscribed");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // 결제 성공 시 구독 정보 저장
            subscriptionService.createSubscription(userEmail, planName);

            response.put("status", "success");
            response.put("message", "Payment successful for plan: " + planName);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "fail");
            response.put("message", "Payment failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/checkSubscription")
    public ResponseEntity<?> checkSubscription(@RequestParam String userEmail) {
        try {
            Optional<Subscription> activeSubscription = subscriptionService.getActiveSubscriptionByEmail(userEmail);
            if (activeSubscription.isPresent()) {
                return ResponseEntity.ok(activeSubscription.get());
            } else {
                return ResponseEntity.ok("No active subscription found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error checking subscription status: " + e.getMessage());
        }
    }

}
