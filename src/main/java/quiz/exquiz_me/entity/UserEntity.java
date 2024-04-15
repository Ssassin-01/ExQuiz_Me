package quiz.exquiz_me.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "user")
public class UserEntity {

    @Id
    private String email;
    private String password;



    @Column(unique = true)
    private String nickname;

    @Column(name = "tel_number", unique = true)
    private String telNumber;

    private LocalDate date; // 사용자 생년월일

    private Integer gender;

    @Column(name = "signup_purpose")
    private String signupPurpose;

    private String identity;

    @Column(name = "one_line_resolution")
    private String oneLineResolution;

    private String permission;
}