package vn.diepgia.mchis.DebtManagement.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.diepgia.mchis.DebtManagement.models.Specification;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TransactionRequest {
    private int id;
    private String note;
    private int numberOfBoxes;
    private String productId;
    private Specification specification;
}
