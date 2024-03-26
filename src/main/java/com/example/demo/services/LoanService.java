package com.example.demo.services;

import com.example.demo.entities.Book;
import com.example.demo.entities.Loan;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    private LoanRepository loanRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public Loan addLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    public List<Loan> getAllLoans () {
        return loanRepository.findAll();
    }
}
