package quiz.exquiz_me.user.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // User 추가하기
    public UserDTO addUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getEmail(),
                bCryptPasswordEncoder.encode(userDTO.getPassword()),
                userDTO.getNickname(),
                userDTO.getTelNumber(),
                userDTO.getDate(),
                userDTO.getGender(),
                userDTO.getSignupPurpose(),
                userDTO.getIdentity(),
                userDTO.getOneLineResolution(),
                "ROLE_USER",
                null
        );
        user = userRepository.save(user);
        return new UserDTO(
                user.getEmail(),
                user.getPassword(),
                user.getNickname(),
                user.getTelNumber(),
                user.getDate(),
                user.getGender(),
                user.getSignupPurpose(),
                user.getIdentity(),
                user.getOneLineResolution()
        );
    }

    // 이메일 중복 확인
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // 전화번호 중복 확인
    public boolean telNumberExists(String telNumber) {
        return userRepository.existsByTelNumber(telNumber);
    }

    public void deleteUser(String email) {
        userRepository.deleteById(email);
    }

    public UserDTO findUserByEmail(String email) {
        return userRepository.findById(email)
                .map(user -> new UserDTO(
                        user.getEmail(),
                        user.getPassword(),
                        user.getNickname(),
                        user.getTelNumber(),
                        user.getDate(),
                        user.getGender(),
                        user.getSignupPurpose(),
                        user.getIdentity(),
                        user.getOneLineResolution()))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}