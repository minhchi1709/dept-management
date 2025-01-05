package vn.diepgia.mchis.DebtManagement.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.User;
import vn.diepgia.mchis.DebtManagement.repositories.UserRepository;
import vn.diepgia.mchis.DebtManagement.responses.UserResponse;

import java.util.List;

import static vn.diepgia.mchis.DebtManagement.models.Role.ADMIN;
import static vn.diepgia.mchis.DebtManagement.models.Role.NORMAL_USER;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUserId(username);
    }

    public User getUserById(String id) {
        return repository.findById(id).orElseThrow();
    }

    public List<UserResponse> getAllUsers() {
        return repository.findAll().stream()
                .filter(u -> u.getRole() == NORMAL_USER)
                .map(u -> UserResponse.builder().id(u.getId()).name(u.getName()).build())
                .toList();
    }

    public List<User> getAllAdmins() {
        return repository.findAll().stream()
                .filter(u -> u.getRole() == ADMIN)
                .toList();
    }
}
