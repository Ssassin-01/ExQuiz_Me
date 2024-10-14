package quiz.exquiz_me.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import quiz.exquiz_me.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


    public User save(User user);
    boolean existsByEmail(String email);
    boolean existsByTelNumber(String telNumber);

    User findByEmail(String email);

}
