package vn.diepgia.mchis.DebtManagement.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer {

    @Id
    @GeneratedValue
    private Long id;

    private String customerId;
    private String name;
    private String province;
    private String telephone;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference
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
