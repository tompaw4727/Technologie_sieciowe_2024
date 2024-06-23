package com.example.demo.repositories;

import com.example.demo.entities.Book;
import com.example.demo.entities.BookDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookDetailsRepository extends JpaRepository<BookDetails, Integer> {

    @Query("SELECT bd from BookDetails bd WHERE bd.bookId = ?1")
    BookDetails findByBookId(Integer bookId);
}
