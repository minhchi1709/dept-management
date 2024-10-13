package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.repositories.CustomerRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final SortCustomerByAscendingIdOrder sortCustomerByAscendingIdOrder;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll().stream().sorted(sortCustomerByAscendingIdOrder).toList();
    }

    public String createCustomer(Customer request) {
        if (customerRepository.findByCustomerId(request.getCustomerId()).isPresent()) {
            throw new RuntimeException(String.format("Mã khách hàng %s đã tồn tại!", request.getId()));
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

    public Customer getCustomerById(String id) {
        return customerRepository.findByCustomerId(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Mã khách hàng %s không tồn tại!", id))
        );
    }

    public String updateCustomer(String id, Customer request) {
        Customer customer = getCustomerById(id);
        customer.setCustomerId(request.getCustomerId());
        customer.setName(request.getName());
        customer.setTelephone(request.getTelephone());
        customer.setProvince(request.getProvince());
        return customerRepository.save(customer).getCustomerId();
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteByCustomerId(id);
    }

    public List<String> getAllCustomerIds() {
        return getAllCustomers()
                .stream()
                .map(Customer::getCustomerId)
                .sorted(Comparator.comparing(String::toString))
                .toList();
    }
}
