package quiz.exquiz_me.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import quiz.exquiz_me.dto.JoinDTO;
import quiz.exquiz_me.service.JoinService;

@Controller
@ResponseBody
public class JoinController {

    private final JoinService joinService;

    public JoinController(JoinService joinService) {
        this.joinService = joinService;
    }

    @PostMapping("/join")
    public String joinProcess(JoinDTO joinDTO) {

        joinService.joinProcesss(joinDTO);

        return "ok";
    }
}
