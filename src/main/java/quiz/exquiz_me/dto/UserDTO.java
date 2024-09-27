package quiz.exquiz_me.dto;

import lombok.*;
import quiz.exquiz_me.user.dto.UserActivityDTO;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String email;
    private String password;
    private String nickname;
    private String telNumber;
    private LocalDate date;
    private Integer gender;
    private String signupPurpose;
    private String identity;
    private String oneLineResolution;

    // 추가: User의 활동 기록
    private List<UserActivityDTO> activities;  // 활동 기록을 포함

}
