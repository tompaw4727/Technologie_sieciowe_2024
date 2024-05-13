package com.example.demo.controllers;

import com.example.demo.dto.LoanDTO;
import com.example.demo.entities.Loan;
import com.example.demo.services.LoanService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan")
public class LoanController {
    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    //Tworzenie nowego wypozyczenia przez czytelnia (returnDate: null, status: notAccepted)
    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public @ResponseBody Loan addLoan(@RequestBody LoanDTO loanDTO){

        return loanService.addLoan(loanDTO);
    }

    //akceptacja wypozyczenia przez bibliotekarza (zmiana statusu na accepted)
    @PutMapping("/acceptloan/{loanId}")
    @Transactional
    public String acceptLoan(@PathVariable("loanId") Integer loanId) {
        return loanService.acceptLoan(loanId);

    }

    //akceptacja zwrotu ksiazki (ustawienie return date na dzisiejsza date)
    @PutMapping("/acceptreturn/{loanId}")
    @Transactional
    public String acceptReturn(@PathVariable("loanId") Integer loanId) {

        return loanService.acceptReturn(loanId);

    }

    @GetMapping("/history/{userId}")
    public @ResponseBody Iterable<Loan> getLoansHistoryOfUser(@PathVariable("userId") Integer userId) {
        return loanService.getLoansHistoryOfUser(userId);

    }

    @GetMapping("/getAll")
    public @ResponseBody Iterable<Loan> getAllLoans(){
        return loanService.getAllLoans();
    }
}
