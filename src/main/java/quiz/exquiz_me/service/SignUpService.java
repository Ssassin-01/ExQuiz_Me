//package quiz.exquiz_me.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import quiz.exquiz_me.dto.UserDTO;
//import quiz.exquiz_me.user.entity.User;
//import quiz.exquiz_me.user.repository.UserRepository;
//
//@Service
//public class SignUpService {
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    public boolean joinProcess(UserDTO userDTO) {
//        if (userRepository.existsByEmail(userDTO.getEmail())) {
//            return false;
//        }
//
//        User userEntity = new User();
//        userEntity.setEmail(userDTO.getEmail());
//        userEntity.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
//        userEntity.setNickname(userDTO.getNickname());
//        userEntity.setTelNumber(userDTO.getTelNumber());
//        userEntity.setDate(userDTO.getDate());
//        userEntity.setGender(userDTO.getGender());
//        userEntity.setSignupPurpose(userDTO.getSignupPurpose());
//
//        userRepository.save(userEntity);
//        return true;
//    }
//}
