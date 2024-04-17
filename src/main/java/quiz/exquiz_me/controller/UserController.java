package quiz.exquiz_me.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/userinfo")
    public Map<String, Object> getUserInfo() {
        Map<String, Object> userInfo = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && !"anonymousUser".equals(authentication.getName())) {
            userInfo.put("email", authentication.getName());
            userInfo.put("role", authentication.getAuthorities().stream().findFirst().get().getAuthority());
        }

        return userInfo;
    }
}