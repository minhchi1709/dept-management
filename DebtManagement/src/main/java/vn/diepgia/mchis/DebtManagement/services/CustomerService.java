package vn.diepgia.mchis.DebtManagement.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.exceptions.DocumentNotFoundException;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.repositories.CustomerRepository;
import vn.diepgia.mchis.DebtManagement.services.sortingSercvices.SortCustomerByAscendingIdOrderService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final SortCustomerByAscendingIdOrderService sortCustomerByAscendingIdOrder;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll().stream().sorted(sortCustomerByAscendingIdOrder).toList();
    }

    public String createCustomer(Customer request) {
        if (customerRepository.findByCustomerId(request.getCustomerId()) != null) {
            throw new RuntimeException(String.format("Mã khách hàng %s đã tồn tại!", request.getCustomerId()));
        }
        return customerRepository.save(
                Customer.builder()
                        .customerId(request.getCustomerId())
                        .name(request.getName())
                        .telephone(request.getTelephone())
                        .province(request.getProvince())
                        .invoices(new ArrayList<>()).build()
        ).getCustomerId();
    }

    public Customer getCustomerById(String id) throws DocumentNotFoundException {
        Customer customer = customerRepository.findByCustomerId(id);
        if (customer == null) {
            throw new DocumentNotFoundException(String.format("Mã khách hàng %s không tồn tại!", id));
        }
        return customer;
    }

    public String updateCustomer(String id, Customer request) throws DocumentNotFoundException {
        Customer customer = getCustomerById(id);
        customer.setCustomerId(request.getCustomerId());
        customer.setName(request.getName());
        customer.setTelephone(request.getTelephone());
        customer.setProvince(request.getProvince());
        return customerRepository.save(customer).getCustomerId();
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    public List<String> getAllCustomerIds() {
        return getAllCustomers()
                .stream()
                .map(Customer::getCustomerId)
                .sorted(Comparator.comparing(String::toString))
                .toList();
    }
}
