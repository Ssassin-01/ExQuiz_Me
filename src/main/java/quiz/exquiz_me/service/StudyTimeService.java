package quiz.exquiz_me.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.entity.learning.StudyTimeLog;
import quiz.exquiz_me.repository.StudyTimeLogRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class StudyTimeService {

    @Autowired
    private StudyTimeLogRepository studyTimeLogRepository;

    @Autowired
    private UserRepository userRepository;

    // 학습 시간 저장 (중복 날짜에 대해 시간 누적)
    // 학습 시간 저장 (중복 날짜에 대해 시간 누적)
    public void saveStudyTime(User user, Long studyTime) {
        LocalDate today = LocalDate.now();

        // 해당 사용자의 오늘 학습 기록을 조회
        List<StudyTimeLog> existingLogs = studyTimeLogRepository.findByUserAndStudyDate(user, today);

        if (!existingLogs.isEmpty()) {
            // 기존 기록이 있으면 시간을 누적
            StudyTimeLog existingLog = existingLogs.get(0); // 첫 번째 기록을 사용
            existingLog.setStudyTime(existingLog.getStudyTime() + studyTime);
            studyTimeLogRepository.save(existingLog);

            // 만약 중복된 로그가 있다면 삭제
            if (existingLogs.size() > 1) {
                for (int i = 1; i < existingLogs.size(); i++) {
                    studyTimeLogRepository.delete(existingLogs.get(i));
                }
            }

        } else {
            // 기존 기록이 없으면 새로 생성
            StudyTimeLog newLog = new StudyTimeLog();
            newLog.setUser(user);
            newLog.setStudyTime(studyTime);
            newLog.setStudyDate(today);
            studyTimeLogRepository.save(newLog);
        }
    }

    // 주간 학습 시간 조회
    public List<StudyTimeLog> getWeeklyStudyTime(String userEmail) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        // 유저 이메일을 통해 기록 조회
        return studyTimeLogRepository.findStudyLogsByUserAndStudyDateBetween(userEmail, startOfWeek, endOfWeek);
    }

    // 월간 학습 시간 조회
    public List<StudyTimeLog> getMonthlyStudyTime(String userEmail, int year, int month) {
        return studyTimeLogRepository.findStudyLogsByUserAndMonth(userEmail, year, month);
    }
}