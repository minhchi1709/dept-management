package vn.diepgia.mchis.DebtManagement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "customers")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer {

    @Id
    private String id;

    private String customerId;
    private String name;
    private String province;
    private String telephone;

    @DBRef
    private List<Invoice> invoices;

    @Override
    public String toString() {
        return "Customer " + id;
    }

    public void addInvoice(Invoice invoice) {
        List<Invoice> invoices = this.invoices;
        invoices.add(invoice);
        setInvoices(invoices);
    }
}
