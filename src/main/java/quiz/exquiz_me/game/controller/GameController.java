package quiz.exquiz_me.game.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import quiz.exquiz_me.game.dto.GameMessage;

@Controller
public class GameController {

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public GameMessage handleGameMessage(GameMessage message) {
        // 메시지 처리 로직
        System.out.println("Received message: " + message.getText() + " from " + message.getNickname());
        return message;
    }
}