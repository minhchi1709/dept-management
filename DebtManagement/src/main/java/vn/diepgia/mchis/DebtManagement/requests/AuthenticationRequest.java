package vn.diepgia.mchis.DebtManagement.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    private String id;
    private String password;
}
