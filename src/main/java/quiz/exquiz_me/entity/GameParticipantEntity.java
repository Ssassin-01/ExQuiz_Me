package quiz.exquiz_me.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "game_participants")
public class GameParticipantEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id")
    private Long participantId;

    @Column(name = "game_session_id")
    private Long gameSessionId;

    @Column(name = "email")
    private String email;

    @Column(name = "score")
    private Integer score;

    @Column(name = "ranking")
    private Integer ranking;

}
