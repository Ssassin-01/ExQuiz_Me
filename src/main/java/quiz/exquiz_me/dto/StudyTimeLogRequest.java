package quiz.exquiz_me.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyTimeLogRequest {
    private String userEmail;
    private Long studyTime;
}