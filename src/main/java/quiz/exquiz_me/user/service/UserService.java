package quiz.exquiz_me.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.user.dto.UserActivityDTO;
import quiz.exquiz_me.user.entity.User;
import quiz.exquiz_me.user.entity.UserActivity;
import quiz.exquiz_me.user.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // User 추가하기
    // UserService.java
    public UserDTO addUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getEmail(),
                bCryptPasswordEncoder.encode(userDTO.getPassword()),  // 비밀번호 암호화
                userDTO.getNickname(),
                userDTO.getTelNumber(),
                userDTO.getDate(),
                userDTO.getGender(),
                userDTO.getSignupPurpose(),
                userDTO.getIdentity(),
                userDTO.getOneLineResolution(),
                "ROLE_USER"
        );

        user = userRepository.save(user);

        // 유저 생성 후 activities 필드를 따로 설정 (빈 리스트로 설정)
        user.setActivities(Collections.emptyList());

        return new UserDTO(
                user.getEmail(),
                user.getPassword(),
                user.getNickname(),
                user.getTelNumber(),
                user.getDate(),
                user.getGender(),
                user.getSignupPurpose(),
                user.getIdentity(),
                user.getOneLineResolution(),
                Collections.emptyList()  // 새 유저의 활동 기록은 처음엔 빈 리스트
        );
    }


    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    // 이메일 중복 확인
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // 전화번호 중복 확인
    public boolean telNumberExists(String telNumber) {
        return userRepository.existsByTelNumber(telNumber);
    }

    // 유저 삭제 로직
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userRepository.delete(user);  // 연관된 데이터도 함께 삭제됨
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    // 이메일로 사용자 찾기 (활동 기록 포함)
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
                        user.getOneLineResolution(),
                        user.getActivities().stream()
                                .map(activity -> new UserActivityDTO(activity.getLoginDate(), activity.getTimeSpent()))
                                .collect(Collectors.toList())  // 활동 기록을 DTO로 변환하여 반환
                ))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // User 업데이트
    public UserDTO updateUser(UserDTO userDTO) {
        User existingUser = userRepository.findByEmail(userDTO.getEmail());

        if (existingUser == null) {
            throw new RuntimeException("User not found with email: " + userDTO.getEmail());
        }

        // 비밀번호는 사용자가 입력했을 때만 업데이트 (빈 값일 경우 기존 비밀번호 유지)
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            existingUser.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        }

        existingUser.setNickname(userDTO.getNickname());
        existingUser.setTelNumber(userDTO.getTelNumber());
        existingUser.setDate(userDTO.getDate());
        existingUser.setGender(userDTO.getGender());
        existingUser.setSignupPurpose(userDTO.getSignupPurpose());

        userRepository.save(existingUser);

        return new UserDTO(
                existingUser.getEmail(),
                existingUser.getPassword(),
                existingUser.getNickname(),
                existingUser.getTelNumber(),
                existingUser.getDate(),
                existingUser.getGender(),
                existingUser.getSignupPurpose(),
                existingUser.getIdentity(),
                existingUser.getOneLineResolution(),
                existingUser.getActivities().stream()
                        .map(activity -> new UserActivityDTO(activity.getLoginDate(), activity.getTimeSpent()))
                        .collect(Collectors.toList())  // 활동 기록을 DTO로 변환하여 반환
        );
    }


    //너 구독자니?
    public boolean isUserSubscribed(String email) {
        User user = userRepository.findByEmail(email);
        return !user.getSubscriptions().isEmpty(); // 구독 내역이 있으면 구독자로 간주
    }
}
