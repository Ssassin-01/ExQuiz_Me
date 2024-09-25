package quiz.exquiz_me.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class TossPaymentService {
    @Value("${toss.api.key}")
    private String tossApiKey;

    public String processPayment(String paymentToken, String amount) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + tossApiKey);

        Map<String, String> body = new HashMap<>();
        body.put("paymentToken", paymentToken);
        body.put("amount", amount);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://api.tosspayments.com/v1/payments", entity, String.class);

        return response.getBody();
    }
}
