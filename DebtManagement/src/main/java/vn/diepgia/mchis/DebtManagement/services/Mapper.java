package vn.diepgia.mchis.DebtManagement.services;

import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.responses.CustomerResponse;
import vn.diepgia.mchis.DebtManagement.responses.InvoiceResponse;

@Service
public class Mapper {

    public InvoiceResponse toInvoiceResponse(Invoice i) {
        return InvoiceResponse.builder()
                .id(i.getId())
                .invoiceLines(i.getInvoiceLines())
                .total(i.getTotal())
                .date(i.getDate())
                .customer(toCustomerResponse(i.getCustomer()))
                .build();
    }

    private CustomerResponse toCustomerResponse(Customer c) {
        return CustomerResponse.builder()
                .id(c.getId())
                .customerId(c.getCustomerId())
                .name(c.getName())
                .province(c.getProvince())
                .telephone(c.getTelephone())
                .build();
    }
}
