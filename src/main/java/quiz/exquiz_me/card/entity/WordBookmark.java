package quiz.exquiz_me.card.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.exquiz_me.user.entity.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    public WordBookmark(User user, VocabularyItem vocabularyItem) {
        this.user = user;
        this.vocabularyItem = vocabularyItem;
    }
}