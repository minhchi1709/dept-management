package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceRequest;
import vn.diepgia.mchis.DebtManagement.requests.PaymentRequest;
import vn.diepgia.mchis.DebtManagement.requests.TransactionRequest;
import vn.diepgia.mchis.DebtManagement.services.InvoiceService;

import java.util.List;
import java.util.logging.Logger;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("invoices")
@Tag(name = "Invoice")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;
    private static final Logger LOGGER = Logger.getLogger(InvoiceController.class.getName());

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        LOGGER.info("Get all invoices");
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PostMapping
    public ResponseEntity<?> createInvoice(@RequestBody InvoiceRequest request) {
        LOGGER.info("Create invoice");
        try {
            return ResponseEntity.ok(invoiceService.createInvoice(request));
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable String id) {
        LOGGER.info("Get invoice with ID: " + id);
        try {
            return ResponseEntity.ok(invoiceService.getInvoiceById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> payInvoice(
            @PathVariable String id,
            @RequestBody PaymentRequest request
    ) {
        try {
            return ResponseEntity.ok(invoiceService.pay(id, request));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{invoiceId}")
    public ResponseEntity<?> updateInvoice(
            @PathVariable String invoiceId,
            @RequestBody InvoiceRequest invoiceRequest,
            @RequestBody TransactionRequest transactionRequest,
            @RequestParam(name = "transactionId") Long transactionId,
            @RequestParam(name = "option") String option
    ) {
        LOGGER.info("Update invoice with ID: " + invoiceId);
        try {
            return ResponseEntity.ok(invoiceService.updateInvoice(invoiceId, invoiceRequest, transactionRequest, option, transactionId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable String id) {
        LOGGER.info("Delete invoice with ID: " + id);
        try {
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/years")
    public ResponseEntity<List<Integer>> getAllYears() {
        return ResponseEntity.ok(invoiceService.getAllYears());
    }

    @GetMapping("/years/{year}/months")
    public ResponseEntity<List<Integer>> getAllMonthsOfYear(@PathVariable int year) {
        return ResponseEntity.ok(invoiceService.getAllMonthsOfYear(year));
    }

    @GetMapping("/years/{year}")
    public ResponseEntity<List<Invoice>> getAllInvoicesOfYear(@PathVariable int year) {
        return ResponseEntity.ok(invoiceService.getAllInvoicesOfYear(year));
    }

    @GetMapping("/years/{year}/months/{month}")
    public ResponseEntity<List<Invoice>> getAllInvoicesOfMonth(
            @PathVariable("year") int year,
            @PathVariable("month") int month
    ) {
        return ResponseEntity.ok(invoiceService.getAllInvoicesOfMonth(year, month));
    }

    @GetMapping("/years/{year}/customers/{customerId}")
    public ResponseEntity<List<Invoice>> getAllInvoicesOfYearOfCustomer(
            @PathVariable("year") int year,
            @PathVariable("customerId") String customerId
    ) {
        return ResponseEntity.ok(invoiceService.getAllInvoicesOfYearOfCustomer(year, customerId));
    }

    @GetMapping("/years/{year}/months/{month}/customers/{customerId}")
    public ResponseEntity<List<Invoice>> getAllInvoicesOfMonthOfCustomer(
            @PathVariable("year") int year,
            @PathVariable("month") int month,
            @PathVariable("customerId") String customerId
    ) {
        return ResponseEntity.ok(invoiceService.getAllInvoicesOfMonthOfCustomer(year, month, customerId));
    }
}
