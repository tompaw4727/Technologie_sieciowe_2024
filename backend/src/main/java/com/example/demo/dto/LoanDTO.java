package com.example.demo.dto;

import com.example.demo.entities.Book;
import com.example.demo.entities.User;
import jakarta.persistence.*;

import java.sql.Date;

public class LoanDTO {
    private Integer loanId;
    private Integer bookId;
    private Integer userId;
    private Date borrowDate;
    private Date dueDate;
    private Date returnDate;

    private String Status;

    public LoanDTO(Integer loanId, Integer bookId, Integer userId, Date borrowDate, Date dueDate, Date returnDate, String status) {
        this.loanId = loanId;
        this.bookId = bookId;
        this.userId = userId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.Status = status;
    }

    public Integer getLoanId() {
        return loanId;
    }

    public void setLoanId(Integer loanId) {
        this.loanId = loanId;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        this.Status = status;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}
