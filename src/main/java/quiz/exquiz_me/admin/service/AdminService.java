package quiz.exquiz_me.admin.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.exquiz_me.admin.entity.Admin;
import quiz.exquiz_me.admin.repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Transactional(readOnly = true)
    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    @Transactional
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Transactional
    public void deleteAdmin(Long adminId) {
        adminRepository.deleteById(adminId);
    }
}