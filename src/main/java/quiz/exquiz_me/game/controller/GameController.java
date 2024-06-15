package quiz.exquiz_me.game.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public GameMessage handleGameMessage(GameMessage message) {
        // 메시지 처리 로직
        System.out.println("Received message: " + message.getText() + " from " + message.getNickname());
        return message;
    }

    public static class GameMessage {
        private String text;
        private String nickname;

        // getters and setters
        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }
    }
}