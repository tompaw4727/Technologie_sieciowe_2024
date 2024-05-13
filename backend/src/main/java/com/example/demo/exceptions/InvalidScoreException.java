package com.example.demo.exceptions;

public class InvalidScoreException extends RuntimeException{
    public InvalidScoreException(String message) {
        super(message);
    }
}
