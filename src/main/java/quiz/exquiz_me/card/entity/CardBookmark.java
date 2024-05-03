package quiz.exquiz_me.entity.card;

import jakarta.persistence.*;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.user.entity.User;

import java.util.Date;

@Entity
@Table(name = "card_bookmarks")
public class CardBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long bookmarkId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

    @Column(name = "bookmark_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bookmarkDate;

    // Getters and setters
}