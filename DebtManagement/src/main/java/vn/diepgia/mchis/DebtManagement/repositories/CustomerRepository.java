package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vn.diepgia.mchis.DebtManagement.models.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    @Query("{ 'customerId' : ?0 }")
    Customer findByCustomerId(String customerId);

    void deleteByCustomerId(String customerId);
}
