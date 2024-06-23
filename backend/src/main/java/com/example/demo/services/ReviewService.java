package com.example.demo.services;

import com.example.demo.entities.Book;
import com.example.demo.entities.Review;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllBookReviews (Integer bookId) {
        return reviewRepository.findAllBookReviews(bookId);
    }
}
