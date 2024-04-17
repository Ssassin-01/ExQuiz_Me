package quiz.exquiz_me.entity.user;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(unique = true)
    private String nickname;

    @Column(unique = true)
    private String telNumber;

    @Column(name = "date")
    private LocalDate date; // 사용자 생년월일

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "signup_purpose")
    private String signupPurpose;

    @Column(name = "identity")
    private String identity = "";

    @Column(name = "one_line_resolution")
    private String oneLineResolution = "";

    @Column(name = "permission")
    private String permission = "ROLE_ADMIN";
}