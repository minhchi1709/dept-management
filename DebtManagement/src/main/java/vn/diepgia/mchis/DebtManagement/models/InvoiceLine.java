package vn.diepgia.mchis.DebtManagement.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class InvoiceLine {
    @Id
    @GeneratedValue
    private Long id;
    private String note;
    private int total;
    private int numberOfBoxes;
    @ManyToOne
    private Specification specification;
    @ManyToOne
    private Product product;

    @Override
    public String toString() {
        return "InvoiceLine " + id;
    }

    public void calculateTotal() {
        this.total = this.numberOfBoxes * this.specification.getPrice() * this.specification.getAmountPerBox();
    }
}
