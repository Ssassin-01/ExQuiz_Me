package quiz.exquiz_me.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import quiz.exquiz_me.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


    public User save(User user);
    boolean existsByEmail(String email);
    boolean existsByTelNumber(String telNumber);

   public User findByEmail(String email);

//    boolean existsById(String email);
//
//    User findByNickname(String nickname);
//
//    Optional<User> findOptionalByEmail(String email);
//
//    @Query("SELECT u FROM User u WHERE u.identity = :identity")
//    User findUserByIdentity(String identity);

}
