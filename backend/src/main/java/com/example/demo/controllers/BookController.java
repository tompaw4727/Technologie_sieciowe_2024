package com.example.demo.controllers;


import com.example.demo.dto.BookDTO;
import com.example.demo.dto.BookInfoDTO;
import com.example.demo.entities.Book;
import com.example.demo.entities.BookDetails;
import com.example.demo.exceptions.InvalidDateException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.services.BookDetailsService;
import com.example.demo.services.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Year;
import java.util.Collection;

@RestController
@RequestMapping("/book")
public class BookController {
    private final BookService bookService;
    private final BookDetailsService bookDetailsService;

    @Autowired
    public BookController(BookService bookService, BookDetailsService bookDetailsService) {

        this.bookService = bookService;
        this.bookDetailsService = bookDetailsService;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllBoksInfo")
    public Collection<BookInfoDTO> getAllBooksInfo(){

        return bookService.getAllBooksInfo();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getBookTitleById")
    public String getBookTitlebyId(@RequestParam Integer bookId) {
        return bookService.getBookTitleById(bookId);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addBookWithDetails")
    @Transactional
    public String addBookwithDetails(@RequestBody BookInfoDTO bookWithDetails) {
        Year currentYear = Year.now();
        if(bookWithDetails.getAvailableCopies() < 0){
            throw new IllegalArgumentException("Available copies number can not  be negative");
        }else if (bookWithDetails.getPublishYear() > currentYear.getValue()) {
            throw new InvalidDateException("Publish Year can not be grater than current year");
        } else {
            Book book = new Book();
            book.setIsbn(bookWithDetails.getIsbn());
            book.setTitle(bookWithDetails.getTitle());
            book.setAuthor(bookWithDetails.getAuthor());
            book.setPublisher(bookWithDetails.getPublisher());
            book.setPublishYear(bookWithDetails.getPublishYear());
            book.setAvailableCopies(bookWithDetails.getAvailableCopies());

            bookService.addBook(book);

            BookDetails bookDetails = new BookDetails();
            bookDetails.setBookId(book.getId());
            bookDetails.setType(bookWithDetails.getType());
            bookDetails.setSummary(bookWithDetails.getSummary());
            bookDetails.setCoverImageUrl(bookWithDetails.getCoverImageUrl());

            bookDetailsService.addBookDetails(bookDetails);
            return "Book with details added succesfully";
        }

    }

}
