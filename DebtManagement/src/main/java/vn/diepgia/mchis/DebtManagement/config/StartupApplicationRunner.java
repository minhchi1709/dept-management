package vn.diepgia.mchis.DebtManagement.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import vn.diepgia.mchis.DebtManagement.requests.RegistrationRequest;
import vn.diepgia.mchis.DebtManagement.services.AuthenticationService;

@Component
@RequiredArgsConstructor

public class StartupApplicationRunner implements ApplicationRunner  {
    private final AuthenticationService authService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        authService.registerAdmin(
                RegistrationRequest.builder()
                        .id("dieptronghuy")
                        .name("Diệp Trọng Huy")
                        .password("admin")
                        .build()
        );
    }
}
