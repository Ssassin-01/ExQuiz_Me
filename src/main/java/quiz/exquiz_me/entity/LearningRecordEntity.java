package quiz.exquiz_me.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class LearningRecordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long recordId;

    @Column(name = "email")
    private String email;

    @Column(name = "card_number")
    private Long cardNumber;

    @Column(name = "learned")
    private Boolean learned;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Column(name = "language")
    private String language;

}
