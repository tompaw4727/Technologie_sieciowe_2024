package com.example.demo.repositories;

import com.example.demo.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;


@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("SELECT b from Book b WHERE b.isbn = ?1")
    Book findByIsbn(String isbn);

    @Query("SELECT b from Book b WHERE b.title = ?1")
    Collection<? extends Book> findByTitle(String title);

    @Query("SELECT b from Book b WHERE b.author = ?1")
    Collection<? extends Book> findByAuthor(String author);

    @Query("SELECT b from Book b WHERE b.publisher = ?1")
    Collection<? extends Book> findByPublisher(String publisher);

    @Query("SELECT b from Book b WHERE b.publishYear = ?1")
    Collection<? extends Book> findByPublishYear(Integer publishYear);
}
