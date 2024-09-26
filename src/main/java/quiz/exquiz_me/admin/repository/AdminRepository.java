package quiz.exquiz_me.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.exquiz_me.admin.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}
