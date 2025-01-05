package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.diepgia.mchis.DebtManagement.models.User;
import vn.diepgia.mchis.DebtManagement.responses.UserResponse;
import vn.diepgia.mchis.DebtManagement.services.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/app/DebtManagement/api/users")
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllAdmins() {
        return ResponseEntity.ok(userService.getAllAdmins());
    }
}
