package quiz.exquiz_me.admin.dto;

import lombok.*;
import quiz.exquiz_me.admin.entity.Admin;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    private Long adminId;
    private String name;
    private String email;

    public AdminDTO(Admin admin) {
    }

    public String getPassword() {
        return null;
    }
}