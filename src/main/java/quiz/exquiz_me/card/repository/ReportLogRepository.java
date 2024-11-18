package quiz.exquiz_me.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.exquiz_me.card.entity.ReportLog;

@Repository
public interface ReportLogRepository extends JpaRepository<ReportLog, Long> {

}