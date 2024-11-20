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
        String paymentKey = request.get("paymentKey");
        String planName = request.get("planName");
        String amount = request.get("amount");
        String userEmail = request.get("userEmail");

        Map<String, Object> response = new HashMap<>();

        try {
            User user = userService.findByEmail(userEmail);
            if (user == null) {
                throw new RuntimeException("사용자를 찾을 수 없습니다: " + userEmail);
            }

            // 이미 구독 중인지 확인
            if (subscriptionService.isUserSubscribed(user)) {
                response.put("status", "fail");
                response.put("message", "사용자는 이미 구독 중입니다.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // 결제 성공 시 구독 정보 저장
            subscriptionService.createSubscription(userEmail, planName, paymentKey);

            response.put("status", "success");
            response.put("message", "결제가 성공적으로 처리되었습니다 : " + planName);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "fail");
            response.put("message", "결제 처리 중 오류가 발생했습니다 : " + e.getMessage());
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

    // 구독 취소 API 추가
    @PostMapping("/cancelSubscription")
    public ResponseEntity<Map<String, String>> cancelSubscription(@RequestBody Map<String, String> request) {
        String userEmail = request.get("userEmail");
        Map<String, String> response = new HashMap<>();
        try {
            boolean isCanceled = subscriptionService.cancelSubscription(userEmail);
            if (isCanceled) {
                response.put("status", "success");
                response.put("message", "Subscription successfully canceled.");
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "fail");
                response.put("message", "No active subscription to cancel.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("status", "fail");
            response.put("message", "Error while canceling subscription: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
