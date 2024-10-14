//package quiz.exquiz_me.entity.learning;
//
//import jakarta.persistence.*;
//import quiz.exquiz_me.card.entity.Card;
//import quiz.exquiz_me.user.entity.User;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "learning_records")
//public class LearningRecord {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "record_id")
//    private Long recordId;
//
//    @ManyToOne
//    @JoinColumn(name = "email", referencedColumnName = "email")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
//    private Card card;
//
//    @Column(name = "learned")
//    private Boolean learned;
//
//    @Column(name = "timestamp")
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date timestamp;
//
//    @Column(name = "language")
//    private String language;
//
//    // Getters and setters
//}