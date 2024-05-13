package com.example.demo.services;

import com.example.demo.entities.Book;
import com.example.demo.entities.BookDetails;
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

    public Iterable<BookDetails> getAllDetails () {
        return bookDetailsRepository.findAll();
    }
}
