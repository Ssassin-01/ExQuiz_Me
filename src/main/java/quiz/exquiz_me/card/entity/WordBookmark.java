package quiz.exquiz_me.entity.card;

import jakarta.persistence.*;
import quiz.exquiz_me.card.entity.VocabularyItem;
import quiz.exquiz_me.user.entity.User;

import java.util.Date;

@Entity
@Table(name = "word_bookmarks")
public class WordBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long bookmarkId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private VocabularyItem vocabularyItem;

    @Column(name = "bookmark_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bookmarkDate;

    // Getters and setters
}