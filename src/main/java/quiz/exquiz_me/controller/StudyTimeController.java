package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.dto.StudyTimeLogRequest;
import quiz.exquiz_me.entity.learning.StudyTimeLog;
import quiz.exquiz_me.service.StudyTimeService;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/study-time")
public class StudyTimeController {

    @Autowired
    private StudyTimeService studyTimeService;

    @Autowired
    private UserService userService;

    // 학습 시간 저장
    @PostMapping("/log")
    public ResponseEntity<String> logStudyTime(@RequestBody StudyTimeLogRequest studyTimeLogRequest) {
        User user = userService.findByEmail(studyTimeLogRequest.getUserEmail());

        if (user == null) {
            return ResponseEntity.status(400).body("User not found");
        }

        studyTimeService.saveStudyTime(user, studyTimeLogRequest.getStudyTime());
        return ResponseEntity.ok("Study time logged successfully");
    }

    // 주간 학습 시간 조회
    @GetMapping("/weekly")
    public List<StudyTimeLog> getWeeklyStudyTime(@RequestParam String userEmail) {
        return studyTimeService.getWeeklyStudyTime(userEmail);
    }

    // 월간 학습 시간 조회
    @GetMapping("/monthly")
    public List<StudyTimeLog> getMonthlyStudyTime(@RequestParam String userEmail, @RequestParam int year, @RequestParam int month) {
        return studyTimeService.getMonthlyStudyTime(userEmail, year, month);
    }
}