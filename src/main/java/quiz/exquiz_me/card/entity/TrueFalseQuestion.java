package quiz.exquiz_me.card.entity;

import jakarta.persistence.*;
import quiz.exquiz_me.card.entity.VocabularyItem;

@Entity
@Table(name = "true_false_question")
public class TrueFalseQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private VocabularyItem vocabularyItem;

    private Boolean isTrue;

    // Getters and Setters
}