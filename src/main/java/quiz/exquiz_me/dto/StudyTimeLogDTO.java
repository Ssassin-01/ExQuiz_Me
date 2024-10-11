package quiz.exquiz_me.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyTimeLogDTO {
    private LocalDate studyDate;
    private Long studyTime; // 초 단위의 학습 시간
}
