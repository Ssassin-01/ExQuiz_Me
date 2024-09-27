package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.user.service.UserService;


@RestController
public class SignUpController {

    @Autowired
    private UserService userService;

    @PostMapping("/joinProc")
    public ResponseEntity<String> joinProcess(@RequestBody UserDTO userDTO) {
        // 이메일 중복 체크
        if (userService.emailExists(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        // 전화번호 중복 체크
        if (userService.telNumberExists(userDTO.getTelNumber())) {
            return ResponseEntity.badRequest().body("Telephone number already exists.");
        }

        // 학년 선택과 가입목적 필드가 제대로 전달되었는지 체크
        if (userDTO.getIdentity() == null || userDTO.getSignupPurpose() == null) {
            return ResponseEntity.badRequest().body("Grade and Signup Purpose are required.");
        }

        // 사용자 등록
        userService.addUser(userDTO);
        return ResponseEntity.ok("User registered successfully.");
    }
}
