package vn.diepgia.mchis.DebtManagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.diepgia.mchis.DebtManagement.exceptions.DocumentNotFoundException;
import vn.diepgia.mchis.DebtManagement.models.Product;
import vn.diepgia.mchis.DebtManagement.models.Specification;
import vn.diepgia.mchis.DebtManagement.responses.BasicResponse;
import vn.diepgia.mchis.DebtManagement.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/app/DebtManagement/api/products")
@Tag(name = "Product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/product-ids")
    public ResponseEntity<List<String>> getAllProductIds() {
        return ResponseEntity.ok(productService.getAllProductIds());
    }

    @GetMapping("/specifications")
    public ResponseEntity<List<Specification>> getAllSpecifications() {
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
            LOGGER.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        try {
            LOGGER.info("Attempting to get product ID: " + id);
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
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
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/specifications/{specification-id}")
    public ResponseEntity<?> deleteSpecification(
            @PathVariable("id") String id,
            @PathVariable("specification-id") String specificationId
    ) {
        try {
            LOGGER.info("Attempting to delete specification ID: " + id + " of product ID: " + id);
            productService.deleteSpecification(id, specificationId);
            return ResponseEntity.ok().build();
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
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
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
