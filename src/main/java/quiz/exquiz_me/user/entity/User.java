package quiz.exquiz_me.user.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.entity.learning.StudyTimeLog;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// User.java
@NoArgsConstructor
@AllArgsConstructor
@Data
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

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "tel_number", unique = true)
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
    private String permission = "ROLE_USER";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<UserActivity> activities; // 활동 기록 필드 추가


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Card> cards;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyTimeLog> studyLogs = new ArrayList<>();  // StudyTimeLog와의 관계

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Subscription> subscriptions = new ArrayList<>();

    // 필요한 필드를 포함한 생성자 (activities 포함)

    public User(String email, String encode, String nickname, String telNumber, LocalDate date, Integer gender, String signupPurpose, String identity, String oneLineResolution, String roleUser) {
        this.email = email;
        this.password = encode;
        this.nickname = nickname;
        this.telNumber = telNumber;
        this.date = date;
        this.gender = gender;
        this.signupPurpose = signupPurpose;
        this.identity = identity;
        this.oneLineResolution = oneLineResolution;
        this.permission = roleUser;
        this.activities = Collections.emptyList();  // activities 필드를 빈 리스트로 초기화
        this.cards = Collections.emptyList();  // cards 필드를 빈 리스트로 초기화
        this.subscriptions = Collections.emptyList(); // subscriptions 필드를 빈 리스트로 초기화
    }
}
