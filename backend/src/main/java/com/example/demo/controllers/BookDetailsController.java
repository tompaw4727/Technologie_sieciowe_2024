package com.example.demo.controllers;

import com.example.demo.entities.BookDetails;
import com.example.demo.entities.User;
import com.example.demo.repositories.BookDetailsRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.BookDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book_details")
public class BookDetailsController {
    private final BookDetailsService bookDetailsService;

    @Autowired
    public BookDetailsController(BookDetailsService bookDetailsService) {
        this.bookDetailsService = bookDetailsService;
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public @ResponseBody BookDetails addBookDetails(@RequestBody BookDetails bookDetails){
        return bookDetailsService.addBookDetails(bookDetails);
    }

    @GetMapping("/getAll")
    public @ResponseBody Iterable<BookDetails> getAllBookDetails(){
        return bookDetailsService.getAllDetails();
    }
}
