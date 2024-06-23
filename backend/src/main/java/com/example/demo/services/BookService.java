package com.example.demo.services;

import com.example.demo.dto.BookDTO;
import com.example.demo.dto.BookInfoDTO;
import com.example.demo.entities.Book;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService {

    private BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Iterable<Book> getAllBooks() {

        return bookRepository.findAll();
    }

    public boolean checkIfBookExistById(Integer Id){

        return !bookRepository.existsById(Id);
    }

    public String deleteBook(String bookIsbn) {
        Book book = bookRepository.findByIsbn(bookIsbn);
        if (book == null) {
            throw new ResourceNotFoundException("Book with that isbn doesn't exists in database");
        }else {
            bookRepository.deleteById(book.getId());
            return "Book successfuly delete";
        }

    }
    public Book getBookByIsbn(String isbn) {
        return  bookRepository.findByIsbn(isbn);
    }

    public Book getBookById(Integer id) {
        return bookRepository.findById2(id);
    }

    public String updateBook(Integer bookId, Book oldBook) {
        Book book = bookRepository.findById(bookId).orElseThrow(() ->
                new ResourceNotFoundException("Book with that Id doesn't exists in database"));

        if (oldBook.getIsbn() == null) {
            book.setIsbn(book.getIsbn());
        }else {
            book.setIsbn(oldBook.getIsbn());
        }

        if (oldBook.getTitle() == null) {
            book.setTitle(book.getTitle());
        }else {
            book.setTitle(oldBook.getTitle());
        }

        if (oldBook.getAuthor() == null) {
            book.setAuthor(book.getAuthor());
        }else {
            book.setAuthor(oldBook.getAuthor());
        }

        if (oldBook.getPublisher() == null) {
            book.setPublisher(book.getPublisher());
        }else {
            book.setPublisher(oldBook.getPublisher());
        }

        if (oldBook.getPublishYear() == null) {
            book.setPublishYear(book.getPublishYear());
        }else {
            book.setPublishYear(oldBook.getPublishYear());
        }

        if (oldBook.getAvailableCopies() == null) {
            book.setAvailableCopies(book.getAvailableCopies());
        }else {
            book.setAvailableCopies(oldBook.getAvailableCopies());
        }


        bookRepository.save(book);

        return  "Succesfully updated book with id: " + bookId ;

    }

    public Iterable<Book> searchBooks(String isbn,String title,String author,String publisher, Integer publishYear) {

        List<Book> booksList = new ArrayList<>();

        if (isbn != null) {

            booksList.add(bookRepository.findByIsbn(isbn));
        } else if (title != null) {

            booksList.addAll(bookRepository.findByTitle(title));
        } else if (author != null) {

            booksList.addAll(bookRepository.findByAuthor(author));
        } else if (publisher != null) {

            booksList.addAll(bookRepository.findByPublisher(publisher));
        } else if (publishYear != null) {

            booksList.addAll(bookRepository.findByPublishYear(publishYear));
        } else {

            return bookRepository.findAll();
        }

        return booksList;
    }

    public Collection<BookInfoDTO> getAllBooksInfo() {

        return bookRepository.getAllBooksInfo();
    }

    public String getBookTitleById(Integer bookId) {
        return bookRepository.findBookTitleByID(bookId);

    }
}
