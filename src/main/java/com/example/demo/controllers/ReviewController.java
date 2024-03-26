package com.example.demo.controllers;

import com.example.demo.entities.Review;
import com.example.demo.exceptions.InvalidScoreException;
import com.example.demo.repositories.ReviewRepository;
import com.example.demo.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public @ResponseBody Review addReview(@RequestBody Review review){
        if (review.getScore() > 100 || review.getScore() < 0) {
            throw new InvalidScoreException("Valid score range is between 0 - 100");
        }else {
            return reviewService.addReview(review);
        }

    }

    @GetMapping("/getAll")
    public @ResponseBody Iterable<Review> getAllReviews(){
        return reviewService.getAllReviews();
    }
}
