package quiz.exquiz_me.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // React의 모든 경로 요청을 index.html로 포워딩
        registry.addViewController("/{spring:[^\\.]*}").setViewName("forward:/index.html");
    }
}
