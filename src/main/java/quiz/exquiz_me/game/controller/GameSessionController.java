package quiz.exquiz_me.game.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.game.dto.GameParticipantDTO;
import quiz.exquiz_me.game.dto.GameSessionDTO;
import quiz.exquiz_me.game.dto.ParticipantUpdate;
import quiz.exquiz_me.game.service.GameSessionService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game-sessions")
public class GameSessionController {

    @Autowired
    private GameSessionService gameSessionService;

    @PostMapping
    public ResponseEntity<GameSessionDTO> createSession(@RequestBody GameSessionDTO gameSessionDto, @RequestHeader("Origin") String origin) {
        try {
            GameSessionDTO createdGameSessionDto = gameSessionService.createGameSession(gameSessionDto, origin);
            System.out.println("GameSessionDTO received: " + gameSessionDto);
            return ResponseEntity.ok(createdGameSessionDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{gameSessionId}/participants")
    public ResponseEntity<List<String>> getParticipants(@PathVariable Long gameSessionId) {
        try {
            List<String> participants = gameSessionService.getParticipants(gameSessionId);
            return ResponseEntity.ok(participants);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 참가자 추가 API 수정 (중복 확인)
    @PostMapping("/{gameSessionId}/add-participant")
    public ResponseEntity<?> addParticipant(@PathVariable Long gameSessionId, @RequestBody ParticipantUpdate participantUpdate) {
        try {
            GameParticipantDTO addedParticipant = gameSessionService.addParticipant(gameSessionId, participantUpdate.getNickname());
            return ResponseEntity.ok(addedParticipant);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
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
        if (gameSessionId == null) {
            return ResponseEntity.badRequest().body("Game session ID is missing or invalid.");
        }

        try {
            boolean isDeleted = gameSessionService.deleteGameSession(gameSessionId);
            if (isDeleted) {
                return ResponseEntity.ok("Game session deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Game session not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting game session.");
        }
    }

    // 새로운 나가기 API (플레이어가 게임을 나갈 때 사용)
    @PostMapping("/exit")
    public ResponseEntity<?> handleExit(@RequestBody Map<String, Long> requestBody) {
        Long gameSessionId = requestBody.get("gameSessionId");

        if (gameSessionId == null) {
            return ResponseEntity.badRequest().body("Game session ID is missing or invalid.");
        }

        try {
            boolean isDeleted = gameSessionService.handleExit(gameSessionId);
            if (isDeleted) {
                return ResponseEntity.ok("Game session exited and deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Game session not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error exiting game session.");
        }
    }




}
