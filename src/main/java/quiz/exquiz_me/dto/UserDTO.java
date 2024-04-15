package quiz.exquiz_me.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class UserDTO {
    private String email;
    private String password;
    private String nickname;
    private String telNumber; // Use consistent naming with your entity
    private LocalDate date; // Date of birth
    private Integer gender;
    private String signupPurpose;
    private String identity;
    private String oneLineResolution;
    // Any other fields needed for user registration
}
