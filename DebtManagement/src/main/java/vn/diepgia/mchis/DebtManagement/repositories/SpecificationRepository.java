package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.diepgia.mchis.DebtManagement.models.Specification;

public interface SpecificationRepository extends JpaRepository<Specification, Integer> {
}
