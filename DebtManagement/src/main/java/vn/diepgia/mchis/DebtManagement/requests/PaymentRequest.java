package vn.diepgia.mchis.DebtManagement.requests;

import lombok.Data;

@Data
public class PaymentRequest {
    private String date;
    private int amount;
}
