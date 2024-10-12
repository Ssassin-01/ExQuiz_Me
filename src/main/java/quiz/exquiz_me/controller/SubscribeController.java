package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quiz.exquiz_me.repository.SubscriptionRepository;
import quiz.exquiz_me.service.SubscriptionService;
import quiz.exquiz_me.user.entity.Subscription;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.service.UserService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class SubscribeController {
    @Autowired
    private UserService userService;
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private SubscriptionService subscriptionService;
//    @PostMapping("/pay")
//    public ResponseEntity<Map<String, Object>> pay(@RequestBody Map<String, String> request) {
//        // 여기에 Toss Payments 결제 API 요청 로직 추가
//        String planName = request.get("planName");
//        String amount = request.get("amount");
//
//        // Toss 결제 요청 및 응답 처리 (여기선 간단하게 리턴)
//        Map<String, Object> response = new HashMap<>();
//        response.put("status", "success");
//        response.put("message", "Payment successful for plan: " + planName);
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/pay")
    public ResponseEntity<Map<String, Object>> pay(@RequestBody Map<String, String> request) {
        String planName = request.get("planName");
        String amount = request.get("amount");
        String userEmail = request.get("userEmail"); // 현재 사용자의 이메일

        Map<String, Object> response = new HashMap<>();
        try {
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

}
