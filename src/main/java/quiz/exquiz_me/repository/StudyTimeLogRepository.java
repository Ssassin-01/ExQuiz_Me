package quiz.exquiz_me.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import quiz.exquiz_me.entity.learning.StudyTimeLog;
import quiz.exquiz_me.user.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface StudyTimeLogRepository extends JpaRepository<StudyTimeLog, Long> {

    @Query("SELECT l FROM StudyTimeLog l WHERE l.user.email = :userEmail AND l.studyDate BETWEEN :start AND :end")
    List<StudyTimeLog> findStudyLogsByUserAndStudyDateBetween(String userEmail, LocalDate start, LocalDate end);

    @Query("SELECT l FROM StudyTimeLog l WHERE l.user.email = :userEmail AND YEAR(l.studyDate) = :year AND MONTH(l.studyDate) = :month")
    List<StudyTimeLog> findStudyLogsByUserAndMonth(String userEmail, int year, int month);

    List<StudyTimeLog> findByUserAndStudyDate(User user, LocalDate studyDate);
}