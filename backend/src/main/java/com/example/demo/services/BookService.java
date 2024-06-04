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

    public String updateBook(Integer bookId, BookDTO bookDTO) {
        Book book = bookRepository.findById(bookId).orElseThrow(() ->
                new ResourceNotFoundException("Book with that Id doesn't exists in database"));

        if (bookDTO.getIsbn() == null) {
            book.setIsbn(book.getIsbn());
        }else {
            book.setIsbn(bookDTO.getIsbn());
        }

        if (bookDTO.getTitle() == null) {
            book.setTitle(book.getTitle());
        }else {
            book.setTitle(bookDTO.getTitle());
        }

        if (bookDTO.getAuthor() == null) {
            book.setAuthor(book.getAuthor());
        }else {
            book.setAuthor(bookDTO.getAuthor());
        }

        if (bookDTO.getPublisher() == null) {
            book.setPublisher(book.getPublisher());
        }else {
            book.setPublisher(bookDTO.getPublisher());
        }

        if (bookDTO.getPublishYear() == null) {
            book.setPublishYear(book.getPublishYear());
        }else {
            book.setPublishYear(bookDTO.getPublishYear());
        }

        if (bookDTO.getAvailableCopies() == null) {
            book.setAvailableCopies(book.getAvailableCopies());
        }else {
            book.setAvailableCopies(bookDTO.getAvailableCopies());
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
