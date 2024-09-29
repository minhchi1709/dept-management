package vn.diepgia.mchis.DebtManagement.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;
    private String note;
    private int total;
    private int numberOfBoxes;

    @ManyToOne
    private Invoice invoice;
    @OneToOne
    private Product product;

    private LocalDateTime lastModified;
}
