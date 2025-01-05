package vn.diepgia.mchis.DebtManagement.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "products")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {

    @Id
    private String id;
    private String productId;
    private String name;

    @DBRef
    private List<Specification> specifications;
}
