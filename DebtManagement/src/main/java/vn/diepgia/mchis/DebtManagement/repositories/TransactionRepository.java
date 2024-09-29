package vn.diepgia.mchis.DebtManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.diepgia.mchis.DebtManagement.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}

