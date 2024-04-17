package quiz.exquiz_me.entity.card;


import jakarta.persistence.*;

@Entity
@Table(name = "vocabulary_item")
public class VocabularyItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

    @Column(name = "english_word")
    private String englishWord;

    @Column(name = "korean_word")
    private String koreanWord;

    // Getters and setters
}
