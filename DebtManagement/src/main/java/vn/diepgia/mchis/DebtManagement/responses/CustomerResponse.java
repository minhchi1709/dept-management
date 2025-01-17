package vn.diepgia.mchis.DebtManagement.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerResponse {
    private Long id;
    private String customerId;
    private String name;
    private String province;
    private String telephone;
}
