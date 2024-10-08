//package quiz.exquiz_me.card.entity;
//
//import jakarta.persistence.*;
//import quiz.exquiz_me.card.entity.VocabularyItem;
//
//@Entity
//@Table(name = "short_answer_questions")
//public class ShortAnswerQuestion {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "question_id")
//    private Long questionId;
//
//    @ManyToOne
//    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
//    private VocabularyItem vocabularyItem;
//
//    @Column(name = "correct_answer")
//    private String correctAnswer;
//
//    // Getters and setters
//}