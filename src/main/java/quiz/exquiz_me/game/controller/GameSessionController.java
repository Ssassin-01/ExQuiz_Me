package quiz.exquiz_me.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.game.dto.GameParticipantDTO;
import quiz.exquiz_me.game.dto.GameSessionDTO;
import quiz.exquiz_me.game.dto.ParticipantUpdate;
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

    // 참가자 추가 API
    @PostMapping("/add-participant")
    public ResponseEntity<?> addParticipant(@RequestBody ParticipantUpdate participantUpdate) {
        try {
            // 참가자 추가 후 DTO 반환
            GameParticipantDTO addedParticipant = gameSessionService.addParticipant(participantUpdate.getGameSessionId(), participantUpdate.getNickname());
            return ResponseEntity.ok(addedParticipant);
        } catch (IllegalStateException e) {
            // 최대 참가자 수 초과 또는 중복 닉네임 시 에러 반환
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // 기타 에러 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{gameSessionId}/participant-count")
    public ResponseEntity<Integer> getParticipantCount(@PathVariable Long gameSessionId) {
        int count = gameSessionService.getParticipantCount(gameSessionId);
        return ResponseEntity.ok(count);
    }

    // 게임 세션 삭제 API
    @DeleteMapping("/{gameSessionId}")
    public ResponseEntity<?> deleteGameSession(@PathVariable Long gameSessionId) {
        try {
            gameSessionService.deleteGameSession(gameSessionId);
            return ResponseEntity.ok("Game session deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting game session.");
        }
    }


}