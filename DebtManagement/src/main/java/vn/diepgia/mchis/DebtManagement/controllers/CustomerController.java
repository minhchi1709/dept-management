package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.exceptions.DocumentNotFoundException;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.services.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/app/DebtManagement/api/customers")
@Tag(name = "Customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerController.class);

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/customer-ids")
    public ResponseEntity<List<String>> getAllCustomerIds() {
        return ResponseEntity.ok(customerService.getAllCustomerIds());
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody Customer request) {
        try {
            LOGGER.info("Attempting to create customer ID: " + request.getCustomerId());
            return ResponseEntity.ok(BasicResponse.<String>builder()
                    .response(customerService.createCustomer(request))
                    .build()
            );
        } catch (RuntimeException e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable String id) {
        try {
            LOGGER.info(String.format("Attempting to get customer ID: %s", id));
            return ResponseEntity.ok(customerService.getCustomerById(id));
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(
            @PathVariable String id,
            @RequestBody Customer request
    ) {
        try {
            LOGGER.info("Attempting to update customer ID: " + id);
            return ResponseEntity.ok(
                    BasicResponse.<String>builder()
                            .response(customerService.updateCustomer(id, request))
                            .build()
            );
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable String id) {
        LOGGER.info(String.format("Attempting to delete customer %s", id));
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }
}
