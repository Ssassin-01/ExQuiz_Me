package quiz.exquiz_me.entity.card;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import quiz.exquiz_me.entity.user.User;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_number")
    private Long cardNumber;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @Column(name = "title")
    private String title;

    @Column(name = "write_dateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date writeDateTime;

    @Column(name = "card_titleImage")
    private String cardTitleImage;

    @Column(name = "countView")
    private Integer countView;

    // Getters and setters
}