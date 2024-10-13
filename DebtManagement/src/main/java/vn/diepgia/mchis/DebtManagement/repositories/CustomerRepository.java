package vn.diepgia.mchis.DebtManagement.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.diepgia.mchis.DebtManagement.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCustomerId(String customerId);
    void deleteByCustomerId(String customerId);
}
