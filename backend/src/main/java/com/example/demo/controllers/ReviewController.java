package com.example.demo.controllers;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entities.Review;
import com.example.demo.exceptions.InvalidScoreException;
import com.example.demo.repositories.ReviewRepository;
import com.example.demo.services.BookService;
import com.example.demo.services.ReviewService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final BookService bookService;
    private final UserService userService;

    @Autowired
    public ReviewController(ReviewService reviewService, BookService bookService, UserService userService)
    {
        this.reviewService = reviewService;
        this.bookService = bookService;
        this.userService = userService;
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody Review addReview(@RequestBody ReviewDTO reviewDTO){
        if (reviewDTO.getScore() > 5 || reviewDTO.getScore() < 0) {
            throw new InvalidScoreException("Valid score range is between 0 - 5");
        }else {
            Review review = new Review();
            review.setScore(reviewDTO.getScore());
            review.setComment(reviewDTO.getComment());
            review.setReviewDate(Date.valueOf(reviewDTO.getReviewDate()));
            review.setBook(bookService.getBookById(reviewDTO.getBookId()));
            review.setUser(userService.getUserById(reviewDTO.getUserId()));
            return reviewService.addReview(review);
        }
    }

    @GetMapping("/getAll")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody Iterable<Review> getAllBookReviews(@RequestParam Integer bookId){
        return reviewService.getAllBookReviews(bookId);
    }
}
