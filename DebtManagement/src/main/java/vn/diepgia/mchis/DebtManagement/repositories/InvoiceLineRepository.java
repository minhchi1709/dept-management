package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;

public interface InvoiceLineRepository extends MongoRepository<InvoiceLine, String> {
}

