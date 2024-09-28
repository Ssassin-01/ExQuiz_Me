package quiz.exquiz_me.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import quiz.exquiz_me.user.service.UserActivityService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${security.cors.allowed-origins}")
    private String allowedOrigins;

    private final UserActivityService userActivityService;

    // UserActivityService 주입
    public SecurityConfig(UserActivityService userActivityService) {
        this.userActivityService = userActivityService;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(auth -> auth
                        .requestMatchers("/", "/login",
                                "/join", "/joinProc",
                                "/images/**", "/js/**",
                                "/css/**", "/img/**",
                                "/qrCodes/**", "/ws/**",
                                "/gameroom/**", "/api/game-sessions/**",
                                "/gaming", "/gameox",
                                "/api/game/card/**", "/api/user/**"
                                , "/payment/**").permitAll()
                        .requestMatchers("/api/cards/**").authenticated()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .successHandler((request, response, authentication) -> {
                            // 로그인 성공 시 UserActivity 기록
                            String userEmail = authentication.getName(); // 로그인된 사용자의 이메일 가져오기
                            userActivityService.logUserActivity(userEmail); // 초기 로그인 기록 저장
                            response.setStatus(200);  // 로그인 성공 처리
                        })
                        .failureHandler((request, response, exception) -> response.setStatus(401))
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            if (authentication != null) {
                                String userEmail = authentication.getName();
                                userActivityService.updateTimeSpent(userEmail, 0); // 로그아웃 시 실시간 시간 리셋 (필요시 수정 가능)
                            }
                            response.setStatus(HttpServletResponse.SC_OK);  // 로그아웃 성공 처리
                        })
                        .deleteCookies("JSESSIONID")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                        .invalidSessionUrl("/login")
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> response.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
                );
        return http.build();
    }
}
