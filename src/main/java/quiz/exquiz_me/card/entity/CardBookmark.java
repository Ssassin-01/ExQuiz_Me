package quiz.exquiz_me.card.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.exquiz_me.user.entity.User;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "card_bookmarks")
public class CardBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long bookmarkId;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    @JsonIgnore // 순환 참조 방지를 위해 User 직렬화에서 제외
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

    @Column(name = "bookmark_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bookmarkDate;

    public CardBookmark(User user, Card card) {
        this.user = user;
        this.card = card;
        this.bookmarkDate = new Date();
    }
}
