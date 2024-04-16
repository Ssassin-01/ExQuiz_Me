package quiz.exquiz_me.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.service.JoinService;

@Controller
public class JoinController {

    @Autowired
    private JoinService joinService;


    @GetMapping("/join")
    public String joinP() {

        return "join";
    }


    @PostMapping("/joinProc1")
    public String joinProcess(UserDTO userDTO) {

        System.out.println(userDTO.getEmail());


        return "redirect:/login";
    }
}