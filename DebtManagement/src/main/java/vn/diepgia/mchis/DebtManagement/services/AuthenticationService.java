package vn.diepgia.mchis.DebtManagement.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.User;
import vn.diepgia.mchis.DebtManagement.repositories.UserRepository;
import vn.diepgia.mchis.DebtManagement.requests.AuthenticationRequest;
import vn.diepgia.mchis.DebtManagement.requests.RegistrationRequest;
import vn.diepgia.mchis.DebtManagement.responses.AuthenticationResponse;
import vn.diepgia.mchis.DebtManagement.security.JwtService;

import java.util.HashMap;
import java.util.Objects;

import static vn.diepgia.mchis.DebtManagement.models.Role.ADMIN;
import static vn.diepgia.mchis.DebtManagement.models.Role.NORMAL_USER;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationService.class);

    public String register(
            User user,
            RegistrationRequest request
    ) {
        if (user.getRole() != ADMIN) {
            throw new IllegalStateException("Not allowed to register users");
        }

        if(userRepository.findById(request.getId()).isPresent()) {
            throw new IllegalStateException("User already exists");
        }
        return userRepository.save(
                User.builder()
                        .userId(request.getId())
                        .name(request.getName())
                        .role(NORMAL_USER)
                        .password(passwordEncoder.encode(request.getPassword()))
                        .build()
        ).getId();
    }

    public void registerAdmin(
            RegistrationRequest request
    ) {
        if (!userRepository.findByRole(ADMIN.name()).isEmpty()) {
            LOGGER.info("Admin already exists, skip registration.");
            return;
        }
        userRepository.save(
                User.builder()
                        .userId(request.getId())
                        .name(request.getName())
                        .role(ADMIN)
                        .password(passwordEncoder.encode(request.getPassword()))
                        .build()
        );
        LOGGER.info("Register admin for first time successfully.");
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getId(),
                        request.getPassword()
                )
        );
        User user = (User) auth.getPrincipal();
        return AuthenticationResponse.builder()
                .token(jwtService.generateToken(user))
                .build();
    }

    public Boolean isAdmin(User user) {
        return user.getRole() == ADMIN;
    }

    public void changePassword(User user, String oldPassword, String newPassword) {
        if (!Objects.equals(user.getPassword(), passwordEncoder.encode(oldPassword))) {
            throw new IllegalStateException("Password does not match");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void setNewPassword(User admin, String userId, String newPassword) {
        if (admin.getRole() != ADMIN) {
            throw new IllegalStateException("Not allowed to change password");
        }
        User user = userRepository.findById(userId).orElseThrow();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void deleteUser(User user, String userId) {
        if (user.getRole() != ADMIN) {
            throw new IllegalStateException("Not allowed to delete user");
        }
        if (userRepository.findById(userId).isEmpty()) {
            throw new IllegalStateException("User does not exist");
        }
        userRepository.deleteById(userId);
    }
}
