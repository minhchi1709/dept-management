package vn.diepgia.mchis.DebtManagement.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
    @Id
    private String id;
    private LocalDate date;

    @OneToMany(mappedBy = "invoice")
    private List<Transaction> transactions;

    @ManyToOne
    private Customer customer;
}
