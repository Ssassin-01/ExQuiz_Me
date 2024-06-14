package quiz.exquiz_me;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExQuizMeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExQuizMeApplication.class, args);
        System.out.println("SPRING_SERVER_ADDRESS: " + System.getenv("SPRING_SERVER_ADDRESS"));
        System.out.println("SPRING_SECURITY_ALLOWED_ORIGINS: " + System.getenv("SPRING_SECURITY_ALLOWED_ORIGINS"));
    }

}
