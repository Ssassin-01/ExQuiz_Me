package quiz.exquiz_me.user.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityDTO {
    private LocalDate loginDate;

    private int timeSpent; // 로그인 시간 (분 단위)
}
