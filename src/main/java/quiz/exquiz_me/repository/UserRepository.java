package quiz.exquiz_me.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Boolean existsByUsername(String username);
    UserEntity findByUsername(String username);
}
