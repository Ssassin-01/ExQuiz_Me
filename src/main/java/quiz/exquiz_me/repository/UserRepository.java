package quiz.exquiz_me.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.entity.user.User;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    User findByEmail(String email);
}
