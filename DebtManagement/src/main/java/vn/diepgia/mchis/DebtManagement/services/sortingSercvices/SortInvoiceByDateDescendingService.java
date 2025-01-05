package vn.diepgia.mchis.DebtManagement.services.sortingSercvices;

import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Invoice;

import java.util.Comparator;

@Service
public class SortInvoiceByDateDescendingService implements Comparator<Invoice> {
    @Override
    public int compare(Invoice o1, Invoice o2) {
        if (o1.getDate().isBefore(o2.getDate())) {
            return -1;
        }
        if (o1.getDate().isAfter(o2.getDate())) {
            return 1;
        }
        return 0;
    }
}
