package quiz.exquiz_me.entity.learning;

import jakarta.persistence.*;
import quiz.exquiz_me.user.entity.User;

import java.time.LocalDate;

@Entity
@Table(name = "study_time_log", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "study_date"})
})
public class StudyTimeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email", nullable = false)
    private User user;

    @Column(name = "study_time", nullable = false)
    private Long studyTime;  // 학습 시간 (초 단위)

    @Column(name = "study_date", nullable = false)
    private LocalDate studyDate;  // 학습 날짜

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(Long studyTime) {
        this.studyTime = studyTime;
    }

    public LocalDate getStudyDate() {
        return studyDate;
    }

    public void setStudyDate(LocalDate studyDate) {
        this.studyDate = studyDate;
    }
}