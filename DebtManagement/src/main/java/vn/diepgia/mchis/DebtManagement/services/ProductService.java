package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.models.Product;
import vn.diepgia.mchis.DebtManagement.models.Specification;
import vn.diepgia.mchis.DebtManagement.models.Transaction;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceRepository;
import vn.diepgia.mchis.DebtManagement.repositories.ProductRepository;
import vn.diepgia.mchis.DebtManagement.repositories.SpecificationRepository;
import vn.diepgia.mchis.DebtManagement.repositories.TransactionRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final SpecificationRepository specificationRepository;
    private final TransactionRepository transactionRepository;
    private final InvoiceRepository invoiceRepository;
    private static final Logger LOGGER = Logger.getLogger(ProductService.class.getName());

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        if (productRepository.findById(product.getId()).isPresent()) {
            throw new RuntimeException(String.format("Mã sản phẩm %s đã tồn tại!", product.getId()));
        }
        if (product.getSpecifications() != null && !product.getSpecifications().isEmpty()) {
            product.setSpecifications(new ArrayList<>());
        }
        return productRepository.save(product);
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Mã sản phẩm %s không tồn tại!", id))
        );
    }

    public Product updateProduct(
            String id,
            Product productRequest,
            Specification specificationRequest,
            String updateSpecification
    ) {
        Product product = getProductById(id);
        product.setName(productRequest.getName());
        product.setId(productRequest.getId());
        List<Specification> specifications = productRequest.getSpecifications();
        switch(updateSpecification) {
            case "none" -> {
                LOGGER.info(String.format("Updated product %s. New ID: %s", id, product.getId()));
            }
            case "add" -> {
                LOGGER.info(String.format("Added new specification to product %s. New ID: %s", id, product.getId()));
                specificationRepository.save(specificationRequest);
                specifications.add(specificationRequest);
            }
            case "remove" -> {
                LOGGER.info(String.format("Removed specification from product %s. New ID: %s", id, product.getId()));
                specifications.remove(specificationRequest);
                specificationRepository.delete(specificationRequest);
            }
        }
        product.setSpecifications(specifications);
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        Product product = getProductById(id);
        for (Transaction transaction: transactionRepository.findAll()
                .stream()
                .filter(transaction -> transaction.getProduct().getId().equals(id))
                .toList()
        ) { // find all transactions with this product
            // find invoice and remove this transaction
            Invoice invoice = transaction.getInvoice();
            List<Transaction> transactions = invoice.getTransactions();
            transactions.remove(transaction);
            invoice.setTransactions(transactions);
            invoiceRepository.save(invoice);
            transactionRepository.delete(transaction);
        }
        specificationRepository.deleteAll(product.getSpecifications());
        productRepository.delete(product);
    }
}
