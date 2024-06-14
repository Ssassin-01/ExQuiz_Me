package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import quiz.exquiz_me.game.entity.GameSessions;
import quiz.exquiz_me.game.entity.ParticipantUpdate;
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
        messagingTemplate.convertAndSend("/topic/participants", new ParticipantUpdate(session.getGameSessionId(), "updateParticipants", participants));
    }
}
