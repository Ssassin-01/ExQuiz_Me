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
        if (userService.emailExists(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }
        if (userService.telNumberExists(userDTO.getTelNumber())) {
            return ResponseEntity.badRequest().body("Telephone number already exists.");
        }
        userService.addUser(userDTO);
        return ResponseEntity.ok("User registered successfully.");
    }
}
