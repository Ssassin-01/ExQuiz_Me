package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import quiz.exquiz_me.game.dto.GameMessage;
import quiz.exquiz_me.game.dto.ParticipantUpdate;
import quiz.exquiz_me.game.entity.GameSessions;
import quiz.exquiz_me.game.repository.GameSessionRepository;

import java.util.HashSet;
import java.util.Set;
import java.util.List;

@Controller
public class WebSocketController {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 각 세션마다 참가자를 관리하도록 수정
    private Set<String> participants = new HashSet<>();

    @MessageMapping("/join")
    public void joinGame(ParticipantUpdate update) {
        // 세션을 찾고 참가자를 관리
        GameSessions session = gameSessionRepository.findById(update.getGameSessionId())
                .orElseThrow(() -> new RuntimeException("Game session not found"));

        participants.add(update.getNickname());
        System.out.println("New participant joined: " + update.getNickname());
        messagingTemplate.convertAndSend("/topic/participants", new ParticipantUpdate(session.getGameSessionId(), "updateParticipants", participants));
    }

    @MessageMapping("/start")
    public void startGame(GameMessage message) {
        System.out.println("Starting game with message: " + message.getText());
        // 게임이 시작되면 현재 참가자들을 세션에 저장 (혹은 초기화)
        participants.clear(); // 이전 참가자 목록 비우기
        messagingTemplate.convertAndSend("/topic/game-start", message);
    }

    @MessageMapping("/answer")
    public void receiveAnswer(GameMessage answer) {
        System.out.println("Received answer from " + answer.getNickname() + ": " + answer.getText());
        messagingTemplate.convertAndSend("/topic/answers", answer);
    }

    @MessageMapping("/end")
    public void endGame(GameMessage message) {
        System.out.println("Ending game with message: " + message.getText());
        participants.clear(); // 게임 종료 시 참가자 목록 초기화
        messagingTemplate.convertAndSend("/topic/participants", new ParticipantUpdate(message.getGameSessionId(), "updateParticipants", participants));
        messagingTemplate.convertAndSend("/topic/game-end", message);
    }
}
