package quiz.exquiz_me.dto;

import lombok.*;

import java.time.LocalDate;

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

}
