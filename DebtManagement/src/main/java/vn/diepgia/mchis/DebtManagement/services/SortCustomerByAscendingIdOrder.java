package vn.diepgia.mchis.DebtManagement.services;

import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;

import java.util.Comparator;

@Service
public class SortCustomerByAscendingIdOrder implements Comparator<Customer> {

    @Override
    public int compare(Customer o1, Customer o2) {
        return o1.getId().compareTo(o2.getId());
    }
}
