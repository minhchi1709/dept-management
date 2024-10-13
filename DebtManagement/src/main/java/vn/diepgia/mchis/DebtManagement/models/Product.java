package vn.diepgia.mchis.DebtManagement.models;

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
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private String productId;
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Specification> specifications;
}
