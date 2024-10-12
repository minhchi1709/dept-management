package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceLineRepository;

@Service
@RequiredArgsConstructor
public class InvoiceLineService {
    private final InvoiceLineRepository invoiceLineRepository;

    public InvoiceLine getTransactionById(Long transactionId) {
        return invoiceLineRepository.findById(transactionId).orElseThrow(
                () -> new EntityNotFoundException("Transaction not found")
        );
    }
}
