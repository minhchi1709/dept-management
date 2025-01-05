package vn.diepgia.mchis.DebtManagement.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.exceptions.DocumentNotFoundException;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceLineRepository;

@Service
@RequiredArgsConstructor
public class InvoiceLineService {
    private final InvoiceLineRepository invoiceLineRepository;

    public InvoiceLine getTransactionById(String transactionId) throws DocumentNotFoundException {
        return invoiceLineRepository.findById(transactionId).orElseThrow(
                () -> new DocumentNotFoundException("Transaction not found")
        );
    }
}
