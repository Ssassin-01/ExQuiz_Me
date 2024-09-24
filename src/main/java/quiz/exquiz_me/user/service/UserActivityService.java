package quiz.exquiz_me.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.entity.UserActivity;
import quiz.exquiz_me.user.repository.UserActivityRepository;
import quiz.exquiz_me.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserActivityService {

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Autowired
    private UserRepository userRepository;

    // 로그인 활동 기록
    public void logUserActivity(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            LocalDate today = LocalDate.now();
            boolean alreadyLogged = userActivityRepository.existsByUserAndLoginDate(user, today);

            if (!alreadyLogged) {
                UserActivity activity = new UserActivity();
                activity.setUser(user);
                activity.setLoginDate(today);
                activity.setTimeSpent(0);
                userActivityRepository.save(activity);
            } else {
                System.out.println("오늘 이미 저장된 활동이 있습니다.");
            }
        }
    }

    // 실시간 업데이트: 일정 시간마다 로그인 시간을 업데이트하는 메서드
    // 실시간 업데이트: 일정 시간마다 로그인 시간을 업데이트하는 메서드
    public void updateTimeSpent(String email, int newTimeSpent) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // 오늘 날짜의 기록을 가져옴
            Optional<UserActivity> optionalActivity = userActivityRepository.findTopByUserAndLoginDate(user, LocalDate.now());

            if (optionalActivity.isPresent()) {
                UserActivity activity = optionalActivity.get();

                // 서버에서 새로운 시간으로 덮어씌움 (누적 시간 직접 설정)
                activity.setTimeSpent(newTimeSpent);
                userActivityRepository.save(activity);

                // 디버그 로그
                System.out.println("저장된 로그인 시간: " + newTimeSpent);
            } else {
                // 오늘 활동이 없을 경우, 새로 생성하여 저장
                UserActivity newActivity = new UserActivity();
                newActivity.setUser(user);
                newActivity.setLoginDate(LocalDate.now());
                newActivity.setTimeSpent(newTimeSpent); // 새로운 총 시간을 저장
                userActivityRepository.save(newActivity);

                // 디버그 로그
                System.out.println("새로운 로그인 시간: " + newTimeSpent);
            }
        }
    }




    // 오늘 날짜의 사용자 활동 기록 조회
    public UserActivity getTodayUserActivity(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            LocalDate today = LocalDate.now();
            // Optional로 오늘 기록을 조회
            Optional<UserActivity> optionalActivity = userActivityRepository.findByUserAndLoginDate(user, today);
            return optionalActivity.orElse(null); // 오늘의 기록이 없으면 null 반환
        }
        return null;
    }

    // 사용자의 월별 활동 기록 조회
    public List<UserActivity> getUserActivityByMonth(String email, int month) {
        return userActivityRepository.findUserActivityByMonth(email, month);
    }
}
