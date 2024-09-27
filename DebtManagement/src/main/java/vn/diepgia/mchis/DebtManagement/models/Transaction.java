package vn.diepgia.mchis.DebtManagement.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Invoice invoice;
    @OneToOne
    private Product product;

}
