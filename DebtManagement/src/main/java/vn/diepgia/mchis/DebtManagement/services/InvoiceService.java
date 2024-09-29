package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.models.Product;
import vn.diepgia.mchis.DebtManagement.models.Transaction;
import vn.diepgia.mchis.DebtManagement.repositories.CustomerRepository;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceRepository;
import vn.diepgia.mchis.DebtManagement.repositories.TransactionRepository;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceRequest;
import vn.diepgia.mchis.DebtManagement.requests.PaymentRequest;
import vn.diepgia.mchis.DebtManagement.requests.TransactionRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final TransactionRepository transactionRepository;
    private final CustomerRepository customerRepository;
    private final ProductService productService;
    private final TransactionService transactionService;
    private final SortInvoiceByDateDescendingService sortInvoiceByDateDescendingService;
    private static final Logger LOGGER = Logger.getLogger(InvoiceService.class.getName());

    private int getInvoiceTotal(List<Transaction> transactions) {
        return transactions.stream().mapToInt(Transaction::getTotal).sum();
    }

    private Invoice updateTotal(Invoice invoice) {
        invoice.setTotal(getInvoiceTotal(invoice.getTransactions()));
        invoice.setRest(invoice.getTotal() - invoice.getPaidAmount());
        invoice.setLastModified(LocalDateTime.now());
        return invoice;
    }

    private Customer getCustomerById(String id) {
        return customerRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Khách hàng %s không tồn tại!", id))
        );
    }

    private Transaction mapTransactionRequestToTransaction(
            TransactionRequest request,
            Invoice invoice
    ) {
        Product product = productService.getProductById(request.getProductId());
        return transactionRepository.save(
                Transaction.builder()
                        .invoice(invoice)
                        .note(request.getNote())
                        .numberOfBoxes(request.getNumberOfBoxes())
                        .total(request.getSpecification().getPrice() * request.getSpecification().getAmountPerBox() * request.getNumberOfBoxes())
                        .product(product)
                        .lastModified(LocalDateTime.now()).build()
        );
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll().stream().sorted(sortInvoiceByDateDescendingService).toList();
    }

    public Invoice createInvoice(InvoiceRequest request) {
        if (invoiceRepository.findById(request.getId()).isPresent()) {
            throw new RuntimeException(String.format("Hóa đơn %s đã tồn tại!", request.getId()));
        }
        Invoice invoice = invoiceRepository.save(
                Invoice.builder()
                        .isPaid(false)
                        .paidAmount(0).build()
        );
        List<Transaction> transactions = request.getTransactions()
                .stream()
                .map(t -> mapTransactionRequestToTransaction(t, invoice)).toList();
        int total = getInvoiceTotal(transactions);
        Customer customer = getCustomerById(request.getCustomerId());
        invoice.setId(request.getId());
        invoice.setCustomer(customer);
        invoice.setTransactions(transactions);
        invoice.setTotal(total);
        invoice.setRest(total);
        if (request.getDate() != null && !request.getDate().isEmpty()) {
            invoice.setDate(LocalDate.parse(request.getDate()));
        } else {
            invoice.setDate(LocalDate.now());
        }
        invoice.setLastModified(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoiceById(String id) {
        return invoiceRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Hóa đon %s không tồn tại!", id))
        );
    }

    public Invoice updateInvoice(
            String invoiceId,
            InvoiceRequest invoiceRequest,
            TransactionRequest transactionRequest,
            String option,
            Long transactionId
    ) {
        Invoice invoice = getInvoiceById(invoiceId);
        // If the user has changed invoiceId
        if (!invoice.getId().equals(invoiceId)) {
            invoice.setId(invoiceRequest.getId());
        }
        // If the user has changed the date
        if (invoiceRequest.getDate() != null &&
                !invoiceRequest.getDate().isEmpty() &&
                !invoice.getDate().equals(LocalDate.parse(invoiceRequest.getDate()))) {
            invoice.setDate(LocalDate.parse(invoiceRequest.getDate()));
        }
        // If the user has changed the customer
        if (!invoiceRequest.getCustomerId().equals(invoice.getCustomer().getId())) {
            Customer customer = getCustomerById(invoiceRequest.getCustomerId());
            invoice.setCustomer(customer);
        }
        switch(option) {
            case "none" -> {
                LOGGER.info(String.format("Updated invoice %s. New ID: %s", invoiceId, invoice.getId()));
            }
            case "add" -> {
                List<Transaction> transactions = invoice.getTransactions();
                transactions.add(mapTransactionRequestToTransaction(transactionRequest, invoice));
                invoice.setTransactions(transactions);
                LOGGER.info(String.format("Added new transaction to invoice %s. New ID: %s", invoiceId, invoice.getId()));
            }
            case "remove" -> {
                List<Transaction> transactions = invoice.getTransactions();
                Transaction transaction = transactionService.getTransactionById(transactionId);
                transactions.remove(transaction);
                transactionRepository.delete(transaction);
                invoice.setTransactions(transactions);
                LOGGER.info(String.format("Removed transaction from invoice %s. New ID: %s", invoiceId, invoice.getId()));
            }
            default -> {
                LOGGER.severe("FAILED! Unexpected value: " + option);
                throw new IllegalStateException("Unexpected value: " + option);
            }
        }
        return invoiceRepository.save(updateTotal(invoice));
    }

    public void deleteInvoice(String id) {
        Invoice invoice = getInvoiceById(id);
        List<Invoice> invoices = invoice.getCustomer().getInvoices();
        invoices.remove(invoice);
        invoice.getCustomer().setInvoices(invoices);
        customerRepository.save(invoice.getCustomer());
        transactionRepository.deleteAll(invoice.getTransactions());
        invoiceRepository.delete(invoice);
    }

    public Invoice pay(String id, PaymentRequest request) {
        Invoice invoice = getInvoiceById(id);
        invoice.setPaidAmount(invoice.getPaidAmount() + request.getAmount());
        invoice.setRest(invoice.getRest() - request.getAmount());
        if (invoice.getRest() <= 0) {
            invoice.setPaid(true);
        }
        invoice.setLastModified(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    public List<Integer> getAllYears() {
        return getAllInvoices()
                .stream()
                .map(invoice -> invoice.getDate().getYear())
                .distinct()
                .toList();
    }

    public List<Integer> getAllMonthsOfYear(int year) {
        return getAllInvoicesOfYear(year)
                .stream()
                .map(invoice -> invoice.getDate().getMonthValue())
                .distinct()
                .toList();
    }

    public List<Invoice> getAllInvoicesOfYear(int year) {
        return getAllInvoices()
                .stream()
                .filter(invoice -> invoice.getDate().getYear() == year)
                .toList();
    }

    public List<Invoice> getAllInvoicesOfMonth(int year, int month) {
        return getAllInvoicesOfYear(year)
                .stream()
                .filter(invoice -> invoice.getDate().getMonthValue() == month)
                .toList();
    }

    public List<Invoice> getAllInvoicesOfYearOfCustomer(int year, String customerId) {
        return getAllInvoicesOfYear(year)
                .stream()
                .filter(invoice -> invoice.getCustomer().getId().equals(customerId))
                .toList();
    }

    public List<Invoice> getAllInvoicesOfMonthOfCustomer(int year, int month, String customerId) {
        return getAllInvoicesOfMonth(year, month)
                .stream()
                .filter(invoice -> invoice.getCustomer().getId().equals(customerId))
                .toList();
    }
}
