package vn.diepgia.mchis.DebtManagement.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Specification {
    @Id
    @GeneratedValue
    private Integer id;
    private String unit;
    private int price;
    private int amountPerBox;
}
