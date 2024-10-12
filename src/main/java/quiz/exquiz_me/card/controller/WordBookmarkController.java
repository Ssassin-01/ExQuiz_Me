package quiz.exquiz_me.card.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.card.dto.WordBookmarkRequest;
import quiz.exquiz_me.card.dto.VocabularyItemDTO;
import quiz.exquiz_me.card.service.WordBookmarkService;

import java.util.List;

@RestController
@RequestMapping("/api/word-bookmarks")
@RequiredArgsConstructor
public class WordBookmarkController {

    private final WordBookmarkService wordBookmarkService;

    // 북마크 추가
    @PostMapping("/add")
    public ResponseEntity<String> addBookmark(@RequestBody WordBookmarkRequest request) {
        wordBookmarkService.addBookmark(request.getEmail(), request.getItemId());
        return ResponseEntity.ok("Bookmark added.");
    }

    // 북마크 삭제
    @PostMapping("/remove")
    public ResponseEntity<String> removeBookmark(@RequestBody WordBookmarkRequest request) {
        wordBookmarkService.removeBookmark(request.getEmail(), request.getItemId());
        return ResponseEntity.ok("Bookmark removed.");
    }

    // 북마크 토글 (추가 or 삭제)
    @PostMapping("/toggle")
    public ResponseEntity<String> toggleBookmark(@RequestParam String email, @RequestParam Long itemId) {
        try {
            boolean isBookmarked = wordBookmarkService.toggleBookmark(email, itemId);
            return ResponseEntity.ok(isBookmarked ? "Bookmarked" : "Unbookmarked");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // 사용자가 북마크한 단어 목록 조회
    @GetMapping("/user/{email}")
    public ResponseEntity<List<VocabularyItemDTO>> getUserBookmarks(@PathVariable String email) {
        List<VocabularyItemDTO> bookmarkedWords = wordBookmarkService.getUserBookmarks(email);
        return ResponseEntity.ok(bookmarkedWords);
    }

    // 특정 단어가 북마크되었는지 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> isWordBookmarked(@RequestParam String email, @RequestParam Long itemId) {
        boolean isBookmarked = wordBookmarkService.isWordBookmarked(email, itemId);
        return ResponseEntity.ok(isBookmarked);
    }
}