package vn.diepgia.mchis.DebtManagement.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDateTime lastModified;
    private int total;
    private int paidAmount;
    private int rest;
    private boolean isPaid;

    @OneToMany(mappedBy = "invoice")
    private List<Transaction> transactions;

    @ManyToOne
    private Customer customer;
}
