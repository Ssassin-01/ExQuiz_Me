package quiz.exquiz_me.admin.controller;

import org.springframework.web.bind.annotation.*;
import quiz.exquiz_me.admin.dto.AdminDTO;
import quiz.exquiz_me.admin.entity.Admin;
import quiz.exquiz_me.admin.service.AdminService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<AdminDTO> getAdmins() {
        List<Admin> admins = adminService.getAdmins();
        return admins.stream().map(AdminDTO::new).collect(Collectors.toList());
    }

    @PostMapping
    public AdminDTO saveAdmin(@RequestBody AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setName(adminDTO.getName());
        admin.setEmail(adminDTO.getEmail());
        admin.setPassword(adminDTO.getPassword());
        Admin savedAdmin = adminService.saveAdmin(admin);
        return new AdminDTO(savedAdmin);

    }

    @DeleteMapping("/{adminId}")
    public void deleteAdmin(@PathVariable Long adminId) {
        adminService.deleteAdmin(adminId);
    }
}