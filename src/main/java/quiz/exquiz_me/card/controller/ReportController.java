package quiz.exquiz_me.card.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.dto.ReportRequestDTO;
import quiz.exquiz_me.card.service.CardService;

@RestController
@RequestMapping("/api/report")
public class ReportController {
    private final Logger logger = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private CardService cardService;

    @PostMapping
    public ResponseEntity<?> reportCard(@RequestBody ReportRequestDTO reportRequest) {
        try {
            logger.info("Received report request: {}", reportRequest);
            cardService.reportCard(reportRequest);
            return ResponseEntity.ok("Report submitted successfully.");
        } catch (Exception e) {
            logger.error("Error submitting report: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error submitting report.");
        }
    }
}