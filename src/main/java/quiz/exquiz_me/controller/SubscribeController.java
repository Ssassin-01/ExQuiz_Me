package quiz.exquiz_me.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class SubscribeController {

    @PostMapping("/pay")
    public ResponseEntity<Map<String, Object>> pay(@RequestBody Map<String, String> request) {
        // 여기에 Toss Payments 결제 API 요청 로직 추가
        String planName = request.get("planName");
        String amount = request.get("amount");

        // Toss 결제 요청 및 응답 처리 (여기선 간단하게 리턴)
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Payment successful for plan: " + planName);
        return ResponseEntity.ok(response);
    }
}
