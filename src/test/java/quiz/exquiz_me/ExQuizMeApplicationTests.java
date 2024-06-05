//package quiz.exquiz_me;
//
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import quiz.exquiz_me.card.dto.CardDTO;
//import quiz.exquiz_me.card.service.CardService;
//import quiz.exquiz_me.dto.UserDTO;
//import quiz.exquiz_me.user.service.UserService;
//
//import java.time.LocalDate;
//import java.util.Date;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//public class ExQuizMeApplicationTests {
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private CardService cardService;
//
//
//    //유저 생성하기
//    @Test
//    //@Transactional
//    public void testAddUser() {
//        UserDTO newUserDTO = new UserDTO("abcd@gmail.com","nonepass", "NewTester", "000-0000-0000", LocalDate.now(), 1, "Purpose", "Identity", "Resolution");
//        UserDTO savedUserDTO = userService.addUser(newUserDTO);
//
//        assertNotNull(savedUserDTO, "DTO는 null이면 안됩니다.");
//        assertEquals("abcd@gmail.com", savedUserDTO.getEmail(), "이메일이 메칭이 안됐어!!!!!");
//    }
//
//    @Test
//    public void testUserExists() {
//        assertTrue(userService.userExists("abc@gmail.com"), "일치하는 email이 존재하지 않습니다.");
//    }
//
//    @Test
//    @Transactional
//    public void testDeleteUser() {
//        userService.deleteUser("newuser@example.com");
//        assertFalse(userService.userExists("newuser@example.com"), "User should no longer exist after deletion");
//    }
//
//    @Test
//    public void testFindUserByEmail() {
//        UserDTO userDTO = userService.findUserByEmail("abc@gmail.com");
//        assertNotNull(userDTO, "Fetched User DTO should not be null");
//        assertEquals("abc@gmail.com", userDTO.getEmail(), "이메일을 찾을 수 없습니다.");
//    }
//
//
//}