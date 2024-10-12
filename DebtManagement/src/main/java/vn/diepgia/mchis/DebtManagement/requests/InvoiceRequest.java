package vn.diepgia.mchis.DebtManagement.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InvoiceRequest {
    private String id;
    private String date;
    private String customerId;
    private List<InvoiceLineRequest> invoiceLines;
}
