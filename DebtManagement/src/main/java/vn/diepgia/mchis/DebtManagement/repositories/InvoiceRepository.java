package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.diepgia.mchis.DebtManagement.models.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, String> {
}
