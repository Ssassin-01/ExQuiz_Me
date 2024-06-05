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
import quiz.exquiz_me.game.dto.GameSessionDTO;
import quiz.exquiz_me.game.entity.GameSessions;
import quiz.exquiz_me.game.repository.GameSessionRepository;
import quiz.exquiz_me.game.utlity.QRCodeGenerator;
import quiz.exquiz_me.user.entity.User;

import java.util.Date;

@Service
public class GameSessionService {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    @Value("${security.cors.allowed-origins}")
    private String gameRoomUrl;

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

        // Save first to generate ID
        gameSessionRepository.save(gameSession);

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
