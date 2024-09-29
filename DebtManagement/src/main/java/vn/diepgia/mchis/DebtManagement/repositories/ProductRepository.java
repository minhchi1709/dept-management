package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.diepgia.mchis.DebtManagement.models.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
}
