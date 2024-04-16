package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.service.SignUpService;

@RestController
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @PostMapping("/joinProc")
    public ResponseEntity<String> joinProcess(@RequestBody UserDTO userDTO) {
        boolean success = signUpService.joinProcess(userDTO);
        System.out.println(userDTO.getEmail());
        System.out.println(userDTO.getPassword());
        System.out.println(userDTO.getDate());
        System.out.println(userDTO.getNickname());
        System.out.println(userDTO.getTelNumber());
        System.out.println(userDTO.getEmail());

        if (!success) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }
        return ResponseEntity.ok("User registered successfully.");
    }
}