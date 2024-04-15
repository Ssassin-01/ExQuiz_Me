package quiz.exquiz_me.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class UserEntity {
        @Id
        private String email;
        private String password;
        private String nickname;
        private String telNumber;
        private LocalDate date;
        private Integer gender;
        private String signupPurpose;
        private String identity;
        private String oneLineResolution;

        private String permission;
}
