package vn.diepgia.mchis.DebtManagement.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping(value = {"", "/", "/login"})
    public String forward() {
        return "index.html";
    }
}
