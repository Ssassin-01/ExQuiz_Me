package quiz.exquiz_me.game.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameSessionDTO {
    private Long gameSessionId;
    private Integer playerCount;
    private Long cardNumber;
    private Integer questionCount;
    private Integer timer;
    private Boolean includeTf;
    private Boolean includeMc;
    private Boolean includeSa;
    private String language;
    private String qrCode;
    private Boolean isActive;
    private Date createdAt;
}