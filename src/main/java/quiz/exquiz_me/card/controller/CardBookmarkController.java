package quiz.exquiz_me.card.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.dto.BookmarkRequest;
import quiz.exquiz_me.card.dto.CardDTO;
import quiz.exquiz_me.card.entity.Card;
import quiz.exquiz_me.card.service.CardBookmarkService;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class CardBookmarkController {
    private final CardBookmarkService cardBookmarkService;

    // 북마크 추가
    @PostMapping("/add")
    public ResponseEntity<?> addBookmark(@RequestParam String email, @RequestParam Long cardNumber) {
        cardBookmarkService.addBookmark(email, cardNumber);
        return ResponseEntity.ok("Bookmark added.");
    }

    // 북마크 삭제
    @PostMapping("/remove")
    public ResponseEntity<?> removeBookmark(@RequestParam String email, @RequestParam Long cardNumber) {
        cardBookmarkService.removeBookmark(email, cardNumber);
        return ResponseEntity.ok("Bookmark removed.");
    }

    // 사용자가 북마크한 카드 목록 조회
    @GetMapping("/user/{email}")
    public ResponseEntity<List<CardDTO>> getUserBookmarks(@PathVariable String email) {
        List<CardDTO> bookmarkedCards = cardBookmarkService.getUserBookmarks(email);
        return ResponseEntity.ok(bookmarkedCards);
    }

    // 특정 카드가 북마크되었는지 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> isCardBookmarked(@RequestParam String email, @RequestParam Long cardNumber) {
        boolean isBookmarked = cardBookmarkService.isCardBookmarked(email, cardNumber);
        return ResponseEntity.ok(isBookmarked);
    }
    @PostMapping("/toggle")
    public ResponseEntity<String> toggleBookmark(@RequestBody BookmarkRequest request) {
        System.out.println("Toggle bookmark called: " + request.getUserEmail() + ", " + request.getCardNumber());
        boolean isBookmarked = cardBookmarkService.toggleBookmark(request.getUserEmail(), request.getCardNumber());
        return ResponseEntity.ok(isBookmarked ? "Bookmarked" : "Unbookmarked");
    }

}
