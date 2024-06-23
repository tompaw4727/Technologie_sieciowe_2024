package com.example.demo.services;

import com.example.demo.entities.Book;
import com.example.demo.entities.BookDetails;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repositories.BookDetailsRepository;
import com.example.demo.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookDetailsService {
    private BookDetailsRepository bookDetailsRepository;

    @Autowired
    public BookDetailsService(BookDetailsRepository bookDetailsRepository) {
        this.bookDetailsRepository = bookDetailsRepository;
    }

    public BookDetails addBookDetails(BookDetails bookDetails) {
        return bookDetailsRepository.save(bookDetails);
    }

    public Iterable<BookDetails> getAllDetails() {
        return bookDetailsRepository.findAll();
    }

    public BookDetails getBookDetailsByBookId(Integer bookId) {
        return bookDetailsRepository.findByBookId(bookId);
    }

    public BookDetails updateBookDetails(Integer bookDetailsId, BookDetails oldBookDetails) {
        BookDetails bookDetails = bookDetailsRepository.findById(bookDetailsId).orElseThrow(() ->
                new ResourceNotFoundException("Book Details with that Id doesn't exists in database"));

        if (oldBookDetails.getBookId() == null) {
            bookDetails.setBookId(bookDetails.getBookId());
        } else {
            bookDetails.setBookId(oldBookDetails.getBookId());
        }

        if (oldBookDetails.getType() == null) {
            bookDetails.setType(bookDetails.getType());
        } else {
            bookDetails.setType(oldBookDetails.getType());
        }

        if (oldBookDetails.getSummary() == null) {
            bookDetails.setSummary(bookDetails.getSummary());
        } else {
            bookDetails.setSummary(oldBookDetails.getSummary());
        }

        if (oldBookDetails.getCoverImageUrl() == null) {
            bookDetails.setCoverImageUrl(bookDetails.getCoverImageUrl());
        } else {
            bookDetails.setCoverImageUrl(oldBookDetails.getCoverImageUrl());
        }

        return bookDetailsRepository.save(bookDetails);
    }
}
