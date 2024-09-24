package quiz.exquiz_me.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import quiz.exquiz_me.user.dto.UserActivityDTO;
import quiz.exquiz_me.user.entity.UserActivity;
import quiz.exquiz_me.user.service.UserActivityService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user-activity")
public class UserActivityController {

    @Autowired
    private UserActivityService userActivityService;

    // 월별 사용자 활동 조회 API
    @GetMapping("/{month}")
    public ResponseEntity<List<UserActivityDTO>> getUserActivityByMonth(@PathVariable int month, Authentication authentication) {
        String userEmail = authentication.getName();  // 로그인된 사용자의 이메일 가져오기
        List<UserActivity> activities = userActivityService.getUserActivityByMonth(userEmail, month);  // 월별 활동 기록 가져오기

        // 로그인 시간을 포함하여 DTO로 변환
        List<UserActivityDTO> activityDTOs = activities.stream()
                .map(activity -> new UserActivityDTO(activity.getLoginDate(), activity.getTimeSpent()))  // 로그인 시간 추가
                .collect(Collectors.toList());

        return ResponseEntity.ok(activityDTOs);
    }

    // 실시간 로그인 시간 업데이트 API
    @PostMapping("/update-time")
    public ResponseEntity<String> updateTimeSpent(@RequestBody UserActivityDTO userActivityDTO, Authentication authentication) {
        String userEmail = authentication.getName();  // 로그인된 사용자의 이메일 가져오기
        userActivityService.updateTimeSpent(userEmail, userActivityDTO.getTimeSpent());  // 로그인 시간 업데이트
        return ResponseEntity.ok("Time spent updated");
    }

    // 현재 로그인된 사용자의 오늘 로그인 기록 추가
    @PostMapping("/log-today")
    public ResponseEntity<String> logToday(Authentication authentication) {
        String userEmail = authentication.getName();  // 로그인된 사용자의 이메일 가져오기
        userActivityService.logUserActivity(userEmail);  // 오늘 날짜 기록
        return ResponseEntity.ok("User activity logged for today.");
    }

    @GetMapping("/today")
    public ResponseEntity<UserActivityDTO> getTodayActivity(Authentication authentication) {
        String userEmail = authentication.getName();  // 로그인된 사용자의 이메일 가져오기
        UserActivity activity = userActivityService.getTodayUserActivity(userEmail);  // 오늘 날짜의 활동 기록 가져오기

        if (activity != null) {
            UserActivityDTO activityDTO = new UserActivityDTO(activity.getLoginDate(), activity.getTimeSpent());
            return ResponseEntity.ok(activityDTO);  // 오늘의 활동 기록 반환
        } else {
            return ResponseEntity.status(404).body(null);  // 기록이 없을 경우 404 반환
        }
    }
}
