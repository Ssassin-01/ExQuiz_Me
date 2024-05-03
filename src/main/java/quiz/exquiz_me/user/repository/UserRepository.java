package quiz.exquiz_me.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.user.entity.User;

public interface UserRepository extends JpaRepository<User, String> {


    public User save(User user);
    boolean existsByEmail(String email);

   public User findByEmail(String email);

}
