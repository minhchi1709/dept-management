package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.diepgia.mchis.DebtManagement.models.Invoice;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
}
