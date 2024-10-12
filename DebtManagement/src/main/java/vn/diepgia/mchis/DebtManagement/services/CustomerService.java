package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.repositories.CustomerRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final InvoiceService invoiceService;
    private final SortCustomerByAscendingIdOrder sortCustomerByAscendingIdOrder;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll().stream().sorted(sortCustomerByAscendingIdOrder).toList();
    }

    public Customer createCustomer(Customer request) {
        if (customerRepository.findById(request.getId()).isPresent()) {
            throw new RuntimeException(String.format("Mã khách hàng %s đã tồn tại!", request.getId()));
        }
        request.setInvoices(new ArrayList<>());
        return customerRepository.save(request);
    }

    public Customer getCustomerById(String id) {
        return customerRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Mã khách hàng %s không tồn tại!", id))
        );
    }

    public Customer updateCustomer(String id, Customer request) {
        if (!id.equals(request.getId())) {
            List<Invoice> invoices = getCustomerById(id).getInvoices();
            customerRepository.deleteById(id);
            if (customerRepository.findById(request.getId()).isPresent()) {
                throw new RuntimeException(String.format("Mã khách hàng %s đã tồn tại!", request.getId()));
            }
            request.setInvoices(invoices);
            return customerRepository.save(request);
        }
        Customer customer = getCustomerById(id);
        customer.setId(request.getId());
        customer.setName(request.getName());
        customer.setTelephone(request.getTelephone());
        customer.setProvince(request.getProvince());
        return customerRepository.save(customer);
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    public List<String> getAllCustomerIds() {
        return getAllCustomers()
                .stream()
                .map(Customer::getId)
                .sorted(Comparator.comparing(String::toString))
                .toList();
    }
}
