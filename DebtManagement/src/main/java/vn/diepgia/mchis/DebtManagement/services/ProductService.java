package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.models.Product;
import vn.diepgia.mchis.DebtManagement.models.Specification;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceRepository;
import vn.diepgia.mchis.DebtManagement.repositories.ProductRepository;
import vn.diepgia.mchis.DebtManagement.repositories.SpecificationRepository;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceLineRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final SpecificationRepository specificationRepository;
    private final InvoiceLineRepository invoiceLineRepository;
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
            specificationRepository.saveAll(product.getSpecifications());
        } else {
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
            Product request
    ) {
        if (!id.equals(request.getId())) {
            productRepository.deleteById(id);
            return productRepository.save(
                    Product.builder()
                            .id(request.getId())
                            .name(request.getName())
                            .specifications(request.getSpecifications())
                            .build()
            );
        }
        Product product = getProductById(id);
        product.setName(request.getName());
        product.setSpecifications(request.getSpecifications());
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        Product product = getProductById(id);
        for (Invoice invoice: invoiceRepository.findAll()){
            List<InvoiceLine> filteredInvoiceLines = invoice.getInvoiceLines()
                    .stream().filter(t -> t.getProduct().getId().equals(id)).toList();
            List<InvoiceLine> invoiceLines = invoice.getInvoiceLines();
            invoiceLines.removeAll(filteredInvoiceLines);
            invoice.setInvoiceLines(invoiceLines);
            invoiceRepository.save(invoice);
            invoiceLineRepository.deleteAll(filteredInvoiceLines);
        }
        specificationRepository.deleteAll(product.getSpecifications());
        productRepository.delete(product);
    }

    public List<String> getAllProductIds() {
        return getAllProducts()
                .stream()
                .map(Product::getId)
                .toList();
    }

    public void deleteSpecification(String id, Integer specificationId) {
        Product product = getProductById(id);
        Specification specification = specificationRepository.findById(specificationId).orElseThrow(
                () -> new EntityNotFoundException("Không tìm thấy quy cách")
        );
        if (!product.getSpecifications().contains(specification)) {
            throw new EntityNotFoundException("Không tìm thấy quy cách");
        }
        List<Specification> specifications = product.getSpecifications();
        specifications.remove(specification);
        product.setSpecifications(specifications);
        productRepository.save(product);
        specificationRepository.delete(specification);
    }

    public List<Specification> getAllSpecifications() {
        return specificationRepository.findAll();
    }
}
