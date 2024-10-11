package quiz.exquiz_me.dto;

public class StudyTimeLogRequest {
    private String userEmail;
    private Long studyTime;

    // 기본 생성자
    public StudyTimeLogRequest() {}

    // Getters and Setters
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(Long studyTime) {
        this.studyTime = studyTime;
    }
}