package quiz.exquiz_me.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quiz.exquiz_me.game.dto.GameSessionDTO;
import quiz.exquiz_me.game.service.GameSessionService;

@RestController
@RequestMapping("/api/game-sessions")
public class GameSessionController {

    @Autowired
    private GameSessionService gameSessionService;

    @PostMapping
    public ResponseEntity<GameSessionDTO> createSession(@RequestBody GameSessionDTO gameSessionDto) {
        try {
            GameSessionDTO createdGameSessionDto = gameSessionService.createGameSession(gameSessionDto);
            return ResponseEntity.ok(createdGameSessionDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}