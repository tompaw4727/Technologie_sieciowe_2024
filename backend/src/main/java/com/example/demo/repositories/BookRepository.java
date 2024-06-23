package com.example.demo.repositories;

import com.example.demo.dto.BookInfoDTO;
import com.example.demo.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;


@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("SELECT b from Book b WHERE b.isbn = ?1")
    Book findByIsbn(String isbn);

    @Query("SELECT b from Book b WHERE b.id = ?1")
    Book findById2(long id);

    @Query("SELECT b from Book b WHERE b.title = ?1")
    Collection<? extends Book> findByTitle(String title);

    @Query("SELECT b from Book b WHERE b.author = ?1")
    Collection<? extends Book> findByAuthor(String author);

    @Query("SELECT b from Book b WHERE b.publisher = ?1")
    Collection<? extends Book> findByPublisher(String publisher);

    @Query("SELECT b from Book b WHERE b.publishYear = ?1")
    Collection<? extends Book> findByPublishYear(Integer publishYear);

    @Query("SELECT new com.example.demo.dto.BookInfoDTO(b.id,b.isbn, b.title, b.author,b.publisher,  b.publishYear, b.availableCopies, bd.coverImageUrl, bd.summary, AVG(r.score), bd.type) " +
            "FROM Book b " +
            "JOIN BookDetails bd ON b.id = bd.bookId " +
            "LEFT JOIN Review r ON b.id = r.book.id " +
            "GROUP BY b.id, b.isbn, b.title, b.author, b.publisher, b.publishYear, b.availableCopies, bd.coverImageUrl, bd.summary, bd.type")
    Collection<BookInfoDTO> getAllBooksInfo();

    @Query("SELECT b.title from Book b WHERE b.id = ?1")
    String findBookTitleByID(Integer bookId);
}
