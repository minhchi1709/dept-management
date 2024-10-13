package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceRequest;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.responses.InvoiceResponse;
import vn.diepgia.mchis.DebtManagement.services.InvoiceService;
import vn.diepgia.mchis.DebtManagement.services.Mapper;

import java.util.List;
import java.util.logging.Logger;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("invoices")
@Tag(name = "Invoice")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;
    private final Mapper mapper;
    private static final Logger LOGGER = Logger.getLogger(InvoiceController.class.getName());

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> getAllInvoices() {
        LOGGER.info("Get all invoices");
        return ResponseEntity.ok(
                invoiceService.getAllInvoices()
                        .stream()
                        .map(mapper::toInvoiceResponse)
                        .toList()
        );
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<List<InvoiceResponse>> getAllInvoicesOfCustomer(@PathVariable String id) {
        LOGGER.info("Get all invoices of customer " + id);
        return ResponseEntity.ok(
                invoiceService.getAllInvoicesOfCustomer(id)
                        .stream()
                        .map(mapper::toInvoiceResponse)
                        .toList()
        );
    }

    @PostMapping
    public ResponseEntity<?> createInvoice(@RequestBody InvoiceRequest request) {
        try {
            LOGGER.info("Attempting to create invoice ID: " + request.getId());
            return ResponseEntity.ok(
                    BasicResponse.builder()
                            .response(invoiceService.createInvoice(request))
                            .build()
            );
        } catch(RuntimeException e) {
            LOGGER.severe(e.toString());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to get invoice ID: " + id);
            return ResponseEntity.ok(mapper.toInvoiceResponse(invoiceService.getInvoiceById(id)));
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.toString());
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to delete invoice ID: " + id);
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.toString());
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }
}
