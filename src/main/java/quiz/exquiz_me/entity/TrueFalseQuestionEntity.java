package quiz.exquiz_me.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TrueFalseQuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;
    @Column(name = "item_id")
    private Long itemId;
    @Column(name = "isTrue")
    private boolean isTrue;



}
