package quiz.exquiz_me.game.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.repository.CardRepository;
import quiz.exquiz_me.dto.CustomUserDetails;
import quiz.exquiz_me.game.dto.GameParticipantDTO;
import quiz.exquiz_me.game.dto.GameSessionDTO;
import quiz.exquiz_me.game.entity.GameParticipant;
import quiz.exquiz_me.game.entity.GameSessions;
import quiz.exquiz_me.game.repository.GameParticipantRepository;
import quiz.exquiz_me.game.repository.GameSessionRepository;
import quiz.exquiz_me.game.utlity.QRCodeGenerator;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.*;

@Service
public class GameSessionService {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameParticipantRepository gameParticipantRepository;

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    @Value("${security.cors.allowed-origins}")
    private String gameRoomUrl;

    private Map<Long, Set<GameParticipantDTO>> sessionParticipants = new HashMap<>();
    private static final int MAX_PARTICIPANTS = 10;

    @Transactional
      public GameSessionDTO createGameSession(GameSessionDTO gameSessionDto) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        Card card = cardRepository.findById(gameSessionDto.getCardNumber())
                .orElseThrow(() -> new IllegalArgumentException("Invalid card number: " + gameSessionDto.getCardNumber()));

        GameSessions gameSession = mapDtoToEntity(gameSessionDto);
        gameSession.setUser(user);
        gameSession.setCard(card);
        gameSession.setIsActive(true);
        gameSession.setCreatedAt(new Date());

        // Save first to generate the session ID
        gameSessionRepository.save(gameSession);

        // Reset participants for this session (clear any previous participants)
        sessionParticipants.put(gameSession.getGameSessionId(), new HashSet<>());

        // Generate QR Code and update the game session
        String qrCodeUrl = qrCodeGenerator.generateQRCodeBase64(
                gameRoomUrl + "/gameroom?roomId=" + gameSession.getGameSessionId(), 300, 300
        );
        if (qrCodeUrl == null) {
            throw new RuntimeException("Failed to generate QR code");
        }
        gameSession.setQrCode(qrCodeUrl);
        gameSessionRepository.save(gameSession);

        return mapEntityToDto(gameSession);
    }


    public GameParticipantDTO addParticipant(Long gameSessionId, String nickname) {
        GameSessions gameSession = gameSessionRepository.findById(gameSessionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid game session ID: " + gameSessionId));

        Set<GameParticipantDTO> participants = sessionParticipants.getOrDefault(gameSessionId, new HashSet<>());

        // Check for duplicate nickname in this session only
        boolean duplicateNickname = participants.stream()
                .anyMatch(participant -> participant.getUserId().equals(nickname));
        if (duplicateNickname) {
            throw new IllegalStateException("중복된 닉네임 : " + nickname + ". 다른 닉네임을 사용해주세요");
        }

        if (participants.size() >= MAX_PARTICIPANTS) {
            throw new IllegalStateException("최대 참가자 수에 도달했습니다.");
        }

        GameParticipantDTO participantDTO = new GameParticipantDTO(null, gameSessionId, nickname, 0, 0);
        participants.add(participantDTO);
        sessionParticipants.put(gameSessionId, participants);  // 참가자 목록을 메모리에 저장

        return participantDTO;
    }


    public int getParticipantCount(Long gameSessionId) {
        return sessionParticipants.getOrDefault(gameSessionId, new HashSet<>()).size();
    }

    // 게임 세션 삭제 메소드
    @Transactional
    public void deleteGameSession(Long gameSessionId) {
        GameSessions gameSession = gameSessionRepository.findById(gameSessionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid game session ID: " + gameSessionId));

        // 참가자 목록도 삭제
        sessionParticipants.remove(gameSessionId);

        // 게임 세션 삭제
        gameSessionRepository.delete(gameSession);
        System.out.println("Game session with ID " + gameSessionId + " has been deleted.");
    }

    private GameSessions mapDtoToEntity(GameSessionDTO dto) {
        GameSessions entity = new GameSessions();
        entity.setPlayerCount(dto.getPlayerCount());
        entity.setQuestionCount(dto.getQuestionCount());
        entity.setTimer(dto.getTimer());
        entity.setIncludeTf(dto.getIncludeTf());
        entity.setIncludeMc(dto.getIncludeMc());
        entity.setIncludeSa(dto.getIncludeSa());
        entity.setLanguage(dto.getLanguage());
        return entity;
    }

    private GameSessionDTO mapEntityToDto(GameSessions entity) {
        GameSessionDTO dto = new GameSessionDTO();
        dto.setGameSessionId(entity.getGameSessionId());
        dto.setPlayerCount(entity.getPlayerCount());
        dto.setQuestionCount(entity.getQuestionCount());
        dto.setTimer(entity.getTimer());
        dto.setIncludeTf(entity.getIncludeTf());
        dto.setIncludeMc(entity.getIncludeMc());
        dto.setIncludeSa(entity.getIncludeSa());
        dto.setLanguage(entity.getLanguage());
        dto.setQrCode(entity.getQrCode());
        dto.setIsActive(entity.getIsActive());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
