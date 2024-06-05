package quiz.exquiz_me.game.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.exquiz_me.game.entity.GameParticipant;

@Repository
public interface GameParticipantRepository extends JpaRepository<GameParticipant, Long> {
    // 필요한 경우 추가 쿼리 메소드를 여기에 구현할 수 있습니다.
}