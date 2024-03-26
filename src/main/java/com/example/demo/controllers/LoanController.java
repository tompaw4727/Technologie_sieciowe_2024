package com.example.demo.controllers;

import com.example.demo.entities.Loan;
import com.example.demo.exceptions.InvalidDateException;
import com.example.demo.repositories.LoanRepository;
import com.example.demo.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;

@RestController
@RequestMapping("/loan")
public class LoanController {
    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public @ResponseBody Loan addLoan(@RequestBody Loan loan){
        LocalDate currentDay = LocalDate.now();
        if (loan.getBorrowDate().toLocalDate().isAfter(currentDay) || loan.getDueDate().toLocalDate().isAfter(currentDay)
        || loan.getReturnDate().toLocalDate().isAfter(currentDay)){
            throw new InvalidDateException("Borrow date, due date, and return date must precede the current date.");
        }else if (loan.getDueDate().toLocalDate().isBefore(loan.getBorrowDate().toLocalDate())) {
            throw new InvalidDateException("Due date must precede the borrow date date.");
        }
        return loanService.addLoan(loan);
    }

    @GetMapping("/getAll")
    public @ResponseBody Iterable<Loan> getAllLoans(){
        return loanService.getAllLoans();
    }
}
