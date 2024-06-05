package quiz.exquiz_me.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.exquiz_me.game.entity.GameSessions;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSessions, Long> {
    // 여기에 필요한 쿼리 메소드를 추가할 수 있습니다.
}