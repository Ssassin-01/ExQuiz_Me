package quiz.exquiz_me.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.dto.UserDTO;
import quiz.exquiz_me.entity.UserEntity;
import quiz.exquiz_me.repository.UserRepository;

@Service
public class JoinService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public void joinProcess(UserDTO userDTO) {


        //db에 이미 동일한 username을 가진 회원이 존재하는지?
        boolean isEmail = userRepository.existsByEmail(userDTO.getEmail());
        if(isEmail) {
            return;
        }

        UserEntity data = new UserEntity();

        data.setEmail(userDTO.getEmail());
        data.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        data.setPermission("ROLE_ADMIN");


        userRepository.save(data);
    }
}
