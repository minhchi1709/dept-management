package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.models.Product;
import vn.diepgia.mchis.DebtManagement.models.Specification;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.services.ProductService;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/app/DebtManagement/api/products")
@Tag(name = "Product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private static final Logger LOGGER = Logger.getLogger(ProductController.class.getName());

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        LOGGER.info("Get all products");
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/product-ids")
    public ResponseEntity<List<String>> getAllProductIds() {
        LOGGER.info("Get all product IDs");
        return ResponseEntity.ok(productService.getAllProductIds());
    }

    @GetMapping("/specifications")
    public ResponseEntity<List<Specification>> getAllSpecifications() {
        LOGGER.info("Get all specifications");
        return ResponseEntity.ok(productService.getAllSpecifications());
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            LOGGER.info("Attempting to create product ID: " + product.getProductId());
            return ResponseEntity.ok(
                    BasicResponse.builder()
                            .response(productService.createProduct(product))
                            .build()
            );
        } catch (RuntimeException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to get product ID: " + id);
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable String id,
            @RequestBody Product request
    ) {
        try {
            LOGGER.info("Attempting to update product ID: " + id);
            return ResponseEntity.ok(
                    BasicResponse.builder()
                            .response(productService.updateProduct(id, request))
                            .build()
            );
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/specifications/{specification-id}")
    public ResponseEntity<?> deleteSpecification(
            @PathVariable("id") String id,
            @PathVariable("specification-id") Integer specificationId
    ) {
        try {
            LOGGER.info("Attempting to delete specification ID: " + id + " of product ID: " + id);
            productService.deleteSpecification(id, specificationId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable String id
    ) {
        try {
            LOGGER.info("Attempting to delete product ID: " + id);
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            LOGGER.severe(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
