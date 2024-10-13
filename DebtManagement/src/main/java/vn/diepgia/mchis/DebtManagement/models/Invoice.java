package vn.diepgia.mchis.DebtManagement.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Invoice {
    @Id
    private String id;
    private LocalDate date;
    private Integer total;

    @OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private List<InvoiceLine> invoiceLines;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "customer_id"
    )
    @JsonBackReference
    private Customer customer;

    @Override
    public String toString() {
        return "Invoice " + id;
    }

    public void calculateTotal() {
        this.total = invoiceLines.stream().mapToInt(InvoiceLine::getTotal).sum();
    }
}
