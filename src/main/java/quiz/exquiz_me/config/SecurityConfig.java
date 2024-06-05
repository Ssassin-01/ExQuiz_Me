package quiz.exquiz_me.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${security.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(); // BCryptPasswordEncoder를 빈으로 등록
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
                .authorizeRequests(auth -> auth
                        .requestMatchers("/", "/login", "/join", "/joinProc", "/images/**", "/js/**", "/css/**", "/img/**", "/qrCodes/**", "/ws/**", "/gameroom/**").permitAll() // 특정 경로에 대한 접근 허용
                        .requestMatchers("/api/cards", "/api/game-sessions").authenticated() // 특정 경로에 대한 인증 요구
                        .anyRequest().authenticated() // 모든 요청에 대해 인증 요구
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/login") // 로그인 처리 URL 설정
                        .successHandler((request, response, authentication) -> response.setStatus(200)) // 로그인 성공 핸들러 설정
                        .failureHandler((request, response, exception) -> response.setStatus(401)) // 로그인 실패 핸들러 설정
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // 로그아웃 URL 설정
                        .logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK)) // 로그아웃 성공 핸들러 설정
                        .deleteCookies("JSESSIONID") // 로그아웃 시 JSESSIONID 쿠키 삭제
                        .invalidateHttpSession(true) // 세션 무효화
                        .clearAuthentication(true)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS) // 세션 정책 설정
                        .invalidSessionUrl("/login") // 세션이 유효하지 않을 때 이동할 URL 설정
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 인증 실패 시 401 응답 설정
                        })
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(allowedOrigins.split(","))); // 환경 변수에서 설정된 값을 사용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
