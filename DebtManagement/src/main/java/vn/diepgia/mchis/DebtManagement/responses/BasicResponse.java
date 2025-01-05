package vn.diepgia.mchis.DebtManagement.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BasicResponse<T> {
    private T response;
}
