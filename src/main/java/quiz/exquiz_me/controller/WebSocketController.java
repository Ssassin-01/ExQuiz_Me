package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import quiz.exquiz_me.game.dto.Answer;
import quiz.exquiz_me.game.dto.ParticipantUpdate;
import quiz.exquiz_me.game.entity.GameSessions;
import quiz.exquiz_me.game.repository.GameSessionRepository;

import java.util.HashSet;
import java.util.Set;

@Controller
public class WebSocketController {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private Set<String> participants = new HashSet<>();

    @MessageMapping("/join")
    public void joinGame(ParticipantUpdate update) {
        GameSessions session = gameSessionRepository.findById(update.getGameSessionId())
                .orElseThrow(() -> new RuntimeException("Game session not found"));

        participants.add(update.getNickname());
        System.out.println("New participant joined: " + update.getNickname()); // 디버깅 로그 추가
        messagingTemplate.convertAndSend("/topic/participants", new ParticipantUpdate(session.getGameSessionId(), "updateParticipants", participants));
    }

    @MessageMapping("/start")
    public void startGame() {
        messagingTemplate.convertAndSend("/topic/game-start", "Game has started");
    }

    @MessageMapping("/answer")
    public void receiveAnswer(Answer answer) {
        System.out.println("Received answer from " + answer.getNickname() + ": " + answer.getText()); // 디버깅 로그 추가
        messagingTemplate.convertAndSend("/topic/answers", answer);
    }
}