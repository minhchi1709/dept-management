package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.exceptions.DocumentNotFoundException;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceRequest;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.responses.InvoiceResponse;
import vn.diepgia.mchis.DebtManagement.services.InvoiceService;
import vn.diepgia.mchis.DebtManagement.services.Mapper;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/app/DebtManagement/api/invoices")
@Tag(name = "Invoice")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;
    private final Mapper mapper;
    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceController.class);

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> getAllInvoices() {
        return ResponseEntity.ok(
                invoiceService.getAllInvoices()
                        .stream()
                        .map(mapper::toInvoiceResponse)
                        .toList()
        );
    }

    @PostMapping(value = "/{id}/generate-pdf", produces = "application/pdf")
    public ResponseEntity<Resource> generateInvoicePdf(@PathVariable String id) {
        LOGGER.info("Generate invoice pdf ID: " + id);
        try {
            String fileName = invoiceService.generateInvoicePdf(id);
            File file = new File(fileName);
            Resource resource = new UrlResource(file.toURI());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename*=UTF-8\"" + URLEncoder.encode(fileName, StandardCharsets.UTF_8) + "\"")
                        .body(resource);
            }
        } catch (MalformedURLException | DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
        }
        return ResponseEntity.badRequest().build();
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
            LOGGER.error(e.toString());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to get invoice ID: " + id);
            return ResponseEntity.ok(mapper.toInvoiceResponse(invoiceService.getInvoiceById(id)));
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.toString());
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to delete invoice ID: " + id);
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok().build();
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.toString());
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }
}
