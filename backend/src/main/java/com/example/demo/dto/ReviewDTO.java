package com.example.demo.dto;

public class ReviewDTO {
    private String comment;
    private Integer score;
    private Integer bookId;
    private Integer userId;
    private String ReviewDate;

    public ReviewDTO(String comment, Integer score, Integer bookId, Integer userId, String reviewDate) {
        this.comment = comment;
        this.score = score;
        this.bookId = bookId;
        this.userId = userId;
        ReviewDate = reviewDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserI(Integer userId) {
        this.userId = userId;
    }

    public String getReviewDate() {
        return ReviewDate;
    }

    public void setReviewDate(String reviewDate) {
        ReviewDate = reviewDate;
    }
}
