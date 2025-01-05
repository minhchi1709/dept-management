package vn.diepgia.mchis.DebtManagement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "invoiceLines")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class InvoiceLine {

    @Id
    private String id;
    private String note;
    private int total;
    private int numberOfBoxes;

    @DBRef
    private Specification specification;

    @DBRef
    private Product product;

    @Override
    public String toString() {
        return "InvoiceLine " + id;
    }

    public void calculateTotal() {
        this.total = this.numberOfBoxes * this.specification.getPrice() * this.specification.getAmountPerBox();
    }
}
