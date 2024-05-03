package quiz.exquiz_me.user.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //user 추가하기
    public UserDTO addUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getEmail(),
                "defaultPass",
                userDTO.getNickname(),
                "000-0000-0000",
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

    //유저가 존재하는가??
    public boolean userExists(String email) {
        return userRepository.existsById(email);
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