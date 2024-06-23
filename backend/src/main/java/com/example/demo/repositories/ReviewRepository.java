package com.example.demo.repositories;

import com.example.demo.entities.Loan;
import com.example.demo.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("SELECT r from Review r WHERE r.book.id = ?1")
    List<Review> findAllBookReviews(Integer bookId);
}
