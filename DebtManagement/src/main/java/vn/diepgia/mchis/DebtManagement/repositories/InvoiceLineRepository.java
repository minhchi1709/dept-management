package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;

public interface InvoiceLineRepository extends JpaRepository<InvoiceLine, Long> {
}

