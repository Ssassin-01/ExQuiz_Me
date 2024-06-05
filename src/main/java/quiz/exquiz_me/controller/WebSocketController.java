package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import quiz.exquiz_me.game.entity.GameParticipant;
import quiz.exquiz_me.game.entity.GameSessions;
import quiz.exquiz_me.game.entity.ParticipantUpdate;
import quiz.exquiz_me.game.repository.GameParticipantRepository;
import quiz.exquiz_me.game.repository.GameSessionRepository;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Controller
public class WebSocketController {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @MessageMapping("/join")
    @SendTo("/topic/participants")
    public ParticipantUpdate updateParticipants(ParticipantUpdate update) {
        GameSessions session = gameSessionRepository.findById(update.getGameSessionId())
                .orElseThrow(() -> new RuntimeException("Game session not found"));

        Set<String> participantNames = session.getParticipants().stream()
                .map(participant -> participant.getUser().getNickname())
                .collect(Collectors.toSet());

        return new ParticipantUpdate(session.getGameSessionId(), participantNames);
    }
}