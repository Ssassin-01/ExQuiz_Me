package quiz.exquiz_me.card.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.exquiz_me.user.entity.User;

import java.util.ArrayList;
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
    private Integer countView = 0;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VocabularyItem> vocabularyItems = new ArrayList<>();
    // Getters and setters
}