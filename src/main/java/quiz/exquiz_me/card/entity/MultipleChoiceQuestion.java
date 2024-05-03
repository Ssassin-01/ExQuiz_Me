package quiz.exquiz_me.card.entity;

import jakarta.persistence.*;
import quiz.exquiz_me.card.entity.VocabularyItem;

@Entity
@Table(name = "multiple_choice_question")
public class MultipleChoiceQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private VocabularyItem vocabularyItem;

    @Column(name = "option_1")
    private String option1;

    @Column(name = "option_2")
    private String option2;

    @Column(name = "option_3")
    private String option3;

    @Column(name = "option_4")
    private String option4;

    @Column(name = "correct_option")
    private Integer correctOption;

    // Getters and setters
}