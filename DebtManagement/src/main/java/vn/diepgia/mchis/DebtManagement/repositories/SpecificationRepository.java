package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.diepgia.mchis.DebtManagement.models.Specification;

public interface SpecificationRepository extends MongoRepository<Specification, String> {
}
