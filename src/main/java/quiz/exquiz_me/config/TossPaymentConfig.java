package quiz.exquiz_me.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;

@Configuration
@Getter
public class TossPaymentConfig {

    @Value("${toss.payment.client_api_key}")
    private String testClientApiKey;

    @Value("${toss.payment.secreate_api_key}")
    private String testSecretApiKey;

    @Value("{toss.payment.success_url}")
    private String successUrl;

    @Value("{toss.payment.fail_url}")
    private String failUrl;

    public static final String URL = "https://api.tosspayments.com/v1/payments";
}
