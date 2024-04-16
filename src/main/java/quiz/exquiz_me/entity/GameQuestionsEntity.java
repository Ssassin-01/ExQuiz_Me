package quiz.exquiz_me.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "game_questions")
public class GameQuestionsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_question_id")
    private Long gameQuestionId;

    @Column(name = "game_session_id")
    private Long gameSessionId;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "round")
    private Integer round;

}
