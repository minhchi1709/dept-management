package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.services.CustomerService;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/app/DebtManagement/api/customers")
@Tag(name = "Customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private static final Logger LOGGER = Logger.getLogger(CustomerController.class.getName());

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        LOGGER.info("Get all customers");
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/customer-ids")
    public ResponseEntity<List<String>> getAllCustomerIds() {
        LOGGER.info("Get all customer IDs");
        return ResponseEntity.ok(customerService.getAllCustomerIds());
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody Customer request) {
        try {
            LOGGER.info("Attempting to create customer ID: " + request.getCustomerId());
            return ResponseEntity.ok(BasicResponse.builder()
                    .response(customerService.createCustomer(request))
                    .build()
            );
        } catch (RuntimeException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to get customer ID: " + id);
            return ResponseEntity.ok(customerService.getCustomerById(id));
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
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
                    BasicResponse.builder()
                            .response(customerService.updateCustomer(id, request))
                            .build()
            );
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable String id) {
        try {
            LOGGER.info(String.format("Attempting to deleting customer %s", id));
            customerService.deleteCustomer(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
