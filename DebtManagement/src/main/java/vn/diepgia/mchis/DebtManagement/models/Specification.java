package vn.diepgia.mchis.DebtManagement.models;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "specifications")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Specification {
    @Id
    private String id;
    private String unit;
    private int price;
    private int amountPerBox;
}
