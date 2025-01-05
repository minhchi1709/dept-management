package vn.diepgia.mchis.DebtManagement.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.exceptions.DocumentNotFoundException;
import vn.diepgia.mchis.DebtManagement.models.*;
import vn.diepgia.mchis.DebtManagement.repositories.*;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceRequest;
import vn.diepgia.mchis.DebtManagement.requests.InvoiceLineRequest;

import vn.diepgia.mchis.DebtManagement.services.sortingSercvices.SortInvoiceByDateDescendingService;

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
    private final PdfGeneratorService pdfGeneratorService;
    private final SortInvoiceByDateDescendingService sortInvoiceByDateDescendingService;
    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceService.class);
    private final InvoiceLineRepository invoiceLineRepository;

    private Product getProductById(String id) {
        return productRepository.findByProductId(id);
    }

    private Customer getCustomerById(String id) {
        return customerRepository.findByCustomerId(id);
    }

    private InvoiceLine mapToInvoiceLine(
            InvoiceLineRequest request
    ) {
        Product product = getProductById(request.getProductId());
        Specification specification = null;
        try {
            specification = specificationRepository.findById(request.getSpecificationId()).orElseThrow(
                    () -> new DocumentNotFoundException("Không tìm thấy quy cách")
            );
        } catch (DocumentNotFoundException e) {
            LOGGER.error(e.getMessage());
        }
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
        Invoice invoice = Invoice.builder()
                        .invoiceId(request.getId())
                        .customer(customer)
                        .invoiceLines(invoiceLineRepository.saveAll(invoiceLines))
                        .date(LocalDate.parse(request.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                        .build();
        invoice.calculateTotal();
        invoiceRepository.save(invoice);
        customer.addInvoice(invoice);
        customerRepository.save(customer);
        return invoice.getId();
    }

    public Invoice getInvoiceById(String id) throws DocumentNotFoundException {
        return invoiceRepository.findById(id).orElseThrow(
                () -> new DocumentNotFoundException(String.format("Hóa đon %s không tồn tại!", id))
        );
    }

    public void deleteInvoice(String id) throws DocumentNotFoundException {
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

    public String generateInvoicePdf(String id) throws DocumentNotFoundException {
        Invoice invoice = getInvoiceById(id);
        return pdfGeneratorService.generatePdf(invoice);
    }
}
