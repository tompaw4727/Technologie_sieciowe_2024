package com.example.demo.controllers;


import com.example.demo.dto.BookDTO;
import com.example.demo.dto.BookInfoDTO;
import com.example.demo.dto.BookInfoWithoutScoreDTO;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getBookInfosByIsbn")
    public BookInfoWithoutScoreDTO getBookInfosByIsbn(@RequestParam String isbn) {
        Book book = bookService.getBookByIsbn(isbn);
        BookDetails bookDetails = bookDetailsService.getBookDetailsByBookId(book.getId());

        BookInfoWithoutScoreDTO result = new BookInfoWithoutScoreDTO(book.getId(), book.getIsbn(), book.getTitle(),
                book.getAuthor(), book.getPublisher(), book.getPublishYear(),
                book.getAvailableCopies(), bookDetails.getCoverImageUrl(), bookDetails.getSummary(),
                bookDetails.getType()
                );

        return result;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    @Transactional
    public String deleteBook(@RequestParam String bookIsbn) {

        return bookService.deleteBook(bookIsbn);
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/updateBookWithDetails")
    @Transactional
    public String updateBookWithDetails(@RequestBody BookInfoDTO bookWithDetails) {
        Year currentYear = Year.now();
        try {
            Integer.parseInt(String.valueOf(bookWithDetails.getAvailableCopies()));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Available copies must be a number");
        }

        if(bookWithDetails.getAvailableCopies() < 0){
            throw new IllegalArgumentException("Available copies number can not  be negative");
        }else if (bookWithDetails.getPublishYear() > currentYear.getValue()) {
            throw new InvalidDateException("Publish Year can not be grater than current year");
        } else {
            Book book = bookService.getBookByIsbn(bookWithDetails.getIsbn());
            book.setIsbn(bookWithDetails.getIsbn());
            book.setTitle(bookWithDetails.getTitle());
            book.setAuthor(bookWithDetails.getAuthor());
            book.setPublisher(bookWithDetails.getPublisher());
            book.setPublishYear(bookWithDetails.getPublishYear());
            book.setAvailableCopies(bookWithDetails.getAvailableCopies());

            bookService.updateBook(book.getId(),book);

            BookDetails bookDetails = bookDetailsService.getBookDetailsByBookId(book.getId());
            bookDetails.setBookId(book.getId());
            bookDetails.setType(bookWithDetails.getType());
            bookDetails.setSummary(bookWithDetails.getSummary());
            bookDetails.setCoverImageUrl(bookWithDetails.getCoverImageUrl());

            bookDetailsService.updateBookDetails(bookDetails.getId(), bookDetails );
            return "Book with details updated succesfully";
        }

    }

}
