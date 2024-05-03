package quiz.exquiz_me.entity.card;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.exquiz_me.entity.user.User;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "card_content")
    private String cardContent;

    @Column(name = "countView")
    private Integer countView;

    @OneToMany(mappedBy = "card")
    private List<VocabularyItem> vocabularyItems; // 카드에 속한 어휘 아이템들
    // Getters and setters
}