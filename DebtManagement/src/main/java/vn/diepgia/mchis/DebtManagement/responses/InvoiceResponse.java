package vn.diepgia.mchis.DebtManagement.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;

import java.time.LocalDate;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class InvoiceResponse {

    private String id;
    private LocalDate date;
    private Integer total;
    private List<InvoiceLine> invoiceLines;
    private CustomerResponse customer;
}
