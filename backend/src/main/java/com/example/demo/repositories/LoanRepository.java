package com.example.demo.repositories;

import com.example.demo.dto.BookInfoDTO;
import com.example.demo.dto.LoanDTO;
import com.example.demo.entities.Book;
import com.example.demo.entities.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {
    @Query("SELECT l from Loan l WHERE l.user.userId = ?1")
    List<Loan> findAllUserLoans(Integer userId);

    @Query("SELECT new com.example.demo.dto.LoanDTO(l.loanId, l.book.id, l.user.userId, l.borrowDate, l.dueDate, l.returnDate, l.Status) " +
            "FROM Loan l ")
    Collection<LoanDTO> getAllLoansInfo();

}
