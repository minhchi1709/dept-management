package vn.diepgia.mchis.DebtManagement.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    private String id;
    private String name;
    private String password;
}
