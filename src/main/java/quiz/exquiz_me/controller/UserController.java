package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.user.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원 정보 수정 API
    @PostMapping("/updateProfile")
    public ResponseEntity<String> updateProfile(@RequestBody UserDTO userDTO) {
        try {
            userService.updateUser(userDTO);
            return ResponseEntity.ok("User profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user profile: " + e.getMessage());
        }
    }

    // 현재 사용자 정보 조회 API
    // 사용자의 전체 프로필과 활동 기록을 조회하는 API
    @GetMapping("/profile/{email}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable String email) {
        try {
            UserDTO userDTO = userService.findUserByEmail(email);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    // 유저의 간단한 정보 (닉네임, 이메일, 한 줄 소개) 조회 API
    @GetMapping("/profile/simple/{email}")
    public ResponseEntity<UserDTO> getSimpleUserProfile(@PathVariable String email) {
        try {
            UserDTO userDTO = userService.findUserByEmail(email);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/{email}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }
}