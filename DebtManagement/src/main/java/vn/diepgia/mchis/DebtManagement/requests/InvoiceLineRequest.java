package vn.diepgia.mchis.DebtManagement.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InvoiceLineRequest {

    private String note;
    private int numberOfBoxes;
    private String productId;
    private String specificationId;
}
