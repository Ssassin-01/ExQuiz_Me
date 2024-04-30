package quiz.exquiz_me;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import quiz.exquiz_me.entity.card.Card;
import quiz.exquiz_me.entity.user.User;
import quiz.exquiz_me.repository.CardRepository;
import quiz.exquiz_me.repository.UserRepository;

@SpringBootTest
public class CardRepositoryTest {

    @Autowired
    private CardRepository CardRepository;

    @Autowired
    private UserRepository userRepository;
    @Test
    public void testSaveCard() {

        // Create and save a user
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setNickname("test_user"); // Set the nickname
        user.setTelNumber("1234567890");
        user.setDate(LocalDate.now());
        user.setGender(0);
        user.setSignupPurpose("Testing");
        user.setIdentity("User");
        user.setOneLineResolution("Testing");

        // Save the user to the database
        userRepository.save(user);

        // Create a card and set the user
        Card card = new Card();
        card.setTitle("Test Card");
        card.setWriteDateTime(new Date());
        card.setCardTitleImage("test_image.jpg");
        card.setCountView(0);
        card.setUser(user); // Set the user for the card

        // Save the card entity
        CardRepository.save(card);

        // Retrieve the saved card from the database
        Optional<Card> savedCardOptional = CardRepository.findById(card.getCardNumber());

        // Check if the card is present in the database
        assertTrue(savedCardOptional.isPresent(), "Card should be saved in the database");

        // Check if the retrieved card matches the saved card
        Card savedCard = savedCardOptional.get();
        assertEquals(card.getTitle(), savedCard.getTitle(), "Title should match");

        // Convert the Date objects to LocalDateTime for comparison
        LocalDateTime expectedDateTime = LocalDateTime.ofInstant(card.getWriteDateTime().toInstant(), ZoneId.systemDefault());
        LocalDateTime actualDateTime = LocalDateTime.ofInstant(savedCard.getWriteDateTime().toInstant(), ZoneId.systemDefault());
        Duration tolerance = Duration.ofSeconds(1); // Adjust as needed
        assertTrue(expectedDateTime.minus(tolerance).isBefore(actualDateTime) && expectedDateTime.plus(tolerance).isAfter(actualDateTime), "Write date time should match");

        assertEquals(card.getCardTitleImage(), savedCard.getCardTitleImage(), "Card title image should match");
        assertEquals(card.getCountView(), savedCard.getCountView(), "Count view should match");

        // Retrieve the user from the saved card and check if it matches the expected user
        User savedUser = savedCard.getUser();
        assertEquals(user.getEmail(), savedUser.getEmail(), "User email should match");
        assertEquals(user.getPassword(), savedUser.getPassword(), "User password should match");
        assertEquals(user.getNickname(), savedUser.getNickname(), "User nickname should match");
        assertEquals(user.getTelNumber(), savedUser.getTelNumber(), "User telNumber should match");
        assertEquals(user.getDate(), savedUser.getDate(), "User date should match");
        assertEquals(user.getGender(), savedUser.getGender(), "User gender should match");
        assertEquals(user.getSignupPurpose(), savedUser.getSignupPurpose(), "User signup purpose should match");
        assertEquals(user.getIdentity(), savedUser.getIdentity(), "User identity should match");
        assertEquals(user.getOneLineResolution(), savedUser.getOneLineResolution(), "User one line resolution should match");
    }
}