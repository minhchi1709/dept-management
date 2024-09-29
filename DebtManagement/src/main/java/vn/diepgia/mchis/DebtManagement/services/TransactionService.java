package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Transaction;
import vn.diepgia.mchis.DebtManagement.repositories.TransactionRepository;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public Transaction getTransactionById(Long transactionId) {
        return transactionRepository.findById(transactionId).orElseThrow(
                () -> new EntityNotFoundException("Transaction not found")
        );
    }
}
