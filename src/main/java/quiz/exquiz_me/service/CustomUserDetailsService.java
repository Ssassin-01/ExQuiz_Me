package quiz.exquiz_me.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import quiz.exquiz_me.dto.CustomUserDetails;
import quiz.exquiz_me.entity.UserEntity;
import quiz.exquiz_me.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userData = userRepository.findByEmail(email);
        if (userData != null) {
            System.out.println("sucess");
            return new CustomUserDetails(userData);

        } else {
            System.out.println("fail");
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }
}