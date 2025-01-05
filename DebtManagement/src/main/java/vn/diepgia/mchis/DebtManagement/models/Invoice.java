package vn.diepgia.mchis.DebtManagement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "invoices")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Invoice {
    @Id
    private String id;

    private String invoiceId;
    private LocalDate date;
    private Integer total;

    @DBRef
    private List<InvoiceLine> invoiceLines;

    @DBRef
    private Customer customer;

    @Override
    public String toString() {
        return "Invoice " + id;
    }

    public void calculateTotal() {
        this.total = invoiceLines.stream().mapToInt(InvoiceLine::getTotal).sum();
    }
}
