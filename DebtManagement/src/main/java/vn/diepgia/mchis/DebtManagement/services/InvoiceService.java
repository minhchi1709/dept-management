package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.*;
import vn.diepgia.mchis.DebtManagement.repositories.CustomerRepository;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceRepository;
import vn.diepgia.mchis.DebtManagement.repositories.ProductRepository;
import vn.diepgia.mchis.DebtManagement.repositories.SpecificationRepository;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceRequest;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceLineRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SpecificationRepository specificationRepository;
    private final SortInvoiceByDateDescendingService sortInvoiceByDateDescendingService;

    private Product getProductById(String id) {
        return productRepository.findByProductId(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Mã sản phẩm %s không tồn tại!", id))
        );
    }

    private Customer getCustomerById(String id) {
        return customerRepository.findByCustomerId(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Khách hàng %s không tồn tại!", id))
        );
    }

    private InvoiceLine mapToInvoiceLine(
            InvoiceLineRequest request
    ) {
        Product product = getProductById(request.getProductId());
        Specification specification = specificationRepository.findById(request.getSpecificationId()).orElseThrow(
                () -> new EntityNotFoundException("Không tìm thấy quy cách")
        );
        if (request.getNumberOfBoxes() < 1) {
            throw new RuntimeException("Số lượng thùng mỗi giao dịch phải lớn hơn 0");
        }
        InvoiceLine invoiceLine = InvoiceLine.builder()
                .note(request.getNote())
                .numberOfBoxes(request.getNumberOfBoxes())
                .total(0)
                .product(product)
                .specification(specification)
                .build();
        invoiceLine.calculateTotal();
        return invoiceLine;
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll()
                .stream()
                .sorted(sortInvoiceByDateDescendingService)
                .toList();
    }

    public String createInvoice(InvoiceRequest request) {
        if (invoiceRepository.findById(request.getId()).isPresent()) {
            throw new RuntimeException(String.format("Hóa đơn %s đã tồn tại!", request.getId()));
        }
        List<InvoiceLine> invoiceLines = request.getInvoiceLines()
                .stream()
                .map(this::mapToInvoiceLine).toList();
        Customer customer = getCustomerById(request.getCustomerId());
        Invoice invoice =
                Invoice.builder()
                        .id(request.getId())
                        .customer(customer)
                        .invoiceLines(invoiceLines)
                        .date(LocalDate.parse(request.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                        .build()
        ;
        invoice.calculateTotal();
        customer.addInvoice(invoice);
        customerRepository.save(customer);
        return invoice.getId();
    }

    public Invoice getInvoiceById(String id) {
        return invoiceRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Hóa đon %s không tồn tại!", id))
        );
    }

    public void deleteInvoice(String id) {
        Invoice invoice = getInvoiceById(id);
        List<Invoice> invoices = invoice.getCustomer().getInvoices();
        invoices.remove(invoice);
        invoice.getCustomer().setInvoices(invoices);
        customerRepository.save(invoice.getCustomer());
        invoiceRepository.delete(invoice);
    }

    public List<Invoice> getAllInvoicesOfCustomer(String id) {
        return getCustomerById(id).getInvoices();
    }

}
