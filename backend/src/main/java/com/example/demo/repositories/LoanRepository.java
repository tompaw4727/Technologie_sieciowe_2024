package com.example.demo.repositories;

import com.example.demo.entities.Book;
import com.example.demo.entities.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
    @Query("SELECT l from Loan l WHERE l.user.userId = ?1")
    List<Loan> findAllUserLoans(Integer userId);

}
