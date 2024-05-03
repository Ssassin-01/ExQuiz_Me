package quiz.exquiz_me.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.exquiz_me.card.entity.Card;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(mappedBy = "user")
    private List<Card> cards; // 사용자가 소유한 카드들
}
