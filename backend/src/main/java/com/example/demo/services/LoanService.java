package com.example.demo.services;

import com.example.demo.dto.LoanDTO;
import com.example.demo.entities.Book;
import com.example.demo.entities.Loan;
import com.example.demo.exceptions.InvalidDateException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.LoanRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {
    private LoanRepository loanRepository;
    private BookRepository bookRepository;
    private UserRepository userRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public Loan addLoan(LoanDTO loanDTO) {
        LocalDate currentDay = LocalDate.now();

        if (loanDTO.getBorrowDate().toLocalDate().isBefore(currentDay) || loanDTO.getDueDate().toLocalDate().isBefore(currentDay)){
            throw new InvalidDateException("Borrow date and due date  must not exceed the current date.");
        } else if (loanDTO.getDueDate().toLocalDate().isBefore(loanDTO.getBorrowDate().toLocalDate())) {
            throw new InvalidDateException("Due date must not precede the borrow date.");
        }

        Loan loan = new Loan();

        loan.setBook(bookRepository.findById(loanDTO.getBookId()).orElseThrow(() -> new ResourceNotFoundException("Book not found")));
        loan.setUser(userRepository.findById(loanDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found")));
        loan.setBorrowDate(loanDTO.getBorrowDate());
        loan.setDueDate(loanDTO.getDueDate());
        loan.setReturnDate(loanDTO.getReturnDate());
        loan.setStatus(loanDTO.getStatus());

        return loanRepository.save(loan);
    }

    public List<Loan> getAllLoans () {
        return loanRepository.findAll();
    }

    public List<Loan> getLoansHistoryOfUser(Integer userId) {
        return loanRepository.findAllUserLoans(userId);

    }

    public String acceptReturn(Integer loanId) {
        LocalDate currentDay = LocalDate.now();

        Loan loan = loanRepository.findById(loanId).orElseThrow(() ->
                new ResourceNotFoundException("Loan with that Id doesn't exists in database"));

        loan.setReturnDate(Date.valueOf(currentDay));

        return "Succesfully return book with id: " + loan.getBook().getId();
    }

    public String acceptLoan(Integer loanId) {

        Loan loan = loanRepository.findById(loanId).orElseThrow(() ->
                new ResourceNotFoundException("Loan with that Id doesn't exists in database"));

        loan.setStatus("accepted");

        return "Succesfully accepted loan with id: " + loan.getLoanId();
    }

}
