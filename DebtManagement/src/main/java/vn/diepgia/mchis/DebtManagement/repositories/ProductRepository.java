package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vn.diepgia.mchis.DebtManagement.models.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query("{ 'productId' : ?0 }")
    Product findByProductId(String productId);
}
