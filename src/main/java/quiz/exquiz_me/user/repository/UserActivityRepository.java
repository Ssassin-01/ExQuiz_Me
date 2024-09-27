package quiz.exquiz_me.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.entity.UserActivity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {

    // 특정 유저의 특정 날짜에 이미 활동 기록이 있는지 확인
    boolean existsByUserAndLoginDate(User user, LocalDate loginDate);

    // 사용자의 월별 활동 기록 조회
    @Query("SELECT ua FROM UserActivity ua WHERE ua.user.email = :email AND MONTH(ua.loginDate) = :month")
    List<UserActivity> findUserActivityByMonth(@Param("email") String email, @Param("month") int month);

    // 오늘 날짜의 기록을 조회하는 쿼리 수정 (중복된 데이터 처리, 최신 기록 반환)
    @Query("SELECT ua FROM UserActivity ua WHERE ua.user = :user AND ua.loginDate = :today ORDER BY ua.id DESC")
    Optional<UserActivity> findTopByUserAndLoginDate(@Param("user") User user, @Param("today") LocalDate today);

    // 특정 유저의 특정 날짜 활동 기록 조회
    List<UserActivity> findUserActivitiesByUserAndLoginDate(@Param("user") User user, @Param("loginDate") LocalDate loginDate);

    // 특정 유저의 특정 날짜 활동 기록 조회 (Optional 사용)
    Optional<UserActivity> findByUserAndLoginDate(User user, LocalDate loginDate);
}
