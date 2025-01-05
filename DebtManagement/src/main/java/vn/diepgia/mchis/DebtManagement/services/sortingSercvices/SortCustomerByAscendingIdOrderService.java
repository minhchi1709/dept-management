package vn.diepgia.mchis.DebtManagement.services.sortingSercvices;

import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;

import java.util.Comparator;

@Service
public class SortCustomerByAscendingIdOrderService implements Comparator<Customer> {

    @Override
    public int compare(Customer o1, Customer o2) {
        return o1.getId().compareTo(o2.getId());
    }
}
