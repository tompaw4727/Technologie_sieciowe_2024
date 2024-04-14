package com.example.demo.controllers;


import com.example.demo.dto.BookDTO;
import com.example.demo.entities.Book;
import com.example.demo.exceptions.InvalidDateException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.services.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Year;

@RestController
@RequestMapping("/book")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {

        this.bookService = bookService;
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public @ResponseBody Book addBook(@RequestBody Book book){
        Year currentYear = Year.now();
        if(book.getAvailableCopies() < 0){
            throw new IllegalArgumentException("Available copies number can not  be negative");
        }else if (book.getPublishYear() > currentYear.getValue()) {
            throw new InvalidDateException("Publish Year can not be grater than current year");
        } else {
            return bookService.addBook(book);
        }
    }

    @DeleteMapping("/delete/{bookIsbn}")
    @Transactional
    public String deleteBook(@PathVariable("bookIsbn") String bookIsbn) {

        return bookService.deleteBook(bookIsbn);
    }

    @PutMapping("/update/{bookId}")
    @Transactional
    public String updateBook(@PathVariable("bookId") Integer bookId,
                             @RequestBody BookDTO bookDTO){

        return bookService.updateBook(bookId, bookDTO);

    }

    @GetMapping("/search")
    public @ResponseBody Iterable<Book> searchBooks(@RequestParam(required = false) String isbn,
                                                    @RequestParam(required = false) String title,
                                                    @RequestParam(required = false) String author,
                                                    @RequestParam(required = false) String publisher,
                                                    @RequestParam(required = false) Integer publishYear) {

        return bookService.searchBooks(isbn, title, author, publisher, publishYear);
    }



    @GetMapping("/getAll")
    public @ResponseBody Iterable<Book> getAllBooks(){

        return bookService.getAllBooks();
    }
}
