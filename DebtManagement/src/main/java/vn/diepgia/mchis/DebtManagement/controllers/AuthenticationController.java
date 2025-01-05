package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.models.User;
import vn.diepgia.mchis.DebtManagement.requests.AuthenticationRequest;
import vn.diepgia.mchis.DebtManagement.requests.RegistrationRequest;
import vn.diepgia.mchis.DebtManagement.responses.AuthenticationResponse;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.responses.UserResponse;
import vn.diepgia.mchis.DebtManagement.services.AuthenticationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/app/DebtManagement/api/auth")
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService userService;
    private final AuthenticationService authenticationService;

    private User getUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }

    @GetMapping
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        User user = getUser(authentication);
        return ResponseEntity.ok(
                UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .build()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<BasicResponse<String>> register(
        @RequestBody RegistrationRequest request,
        Authentication authentication
    ) {
        try {
            return ResponseEntity.ok(
                    BasicResponse.<String>builder()
                            .response(userService.register(getUser(authentication), request))
                            .build()
            );
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(
                userService.authenticate(request)
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<BasicResponse<Boolean>> isAdmin(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                BasicResponse.<Boolean>builder()
                        .response(userService.isAdmin(getUser(authentication))).build()
        );
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam("oldPassword") String oldPassword,
            @RequestParam("newPassword") String newPassword,
            Authentication authentication
    ) {
        try {
            userService.changePassword(getUser(authentication), oldPassword, newPassword);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/set-new-password")
    public ResponseEntity<?> setNewPassword(
            @RequestParam("newPassword") String newPassword,
            @RequestParam("userId") String userId,
            Authentication authentication
    ) {
        userService.setNewPassword(getUser(authentication), userId, newPassword);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(
            Authentication authentication,
            @RequestParam("userId") String userId
    ) {
        try {
            authenticationService.deleteUser(getUser(authentication), userId);
            return ResponseEntity.ok().build();
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
