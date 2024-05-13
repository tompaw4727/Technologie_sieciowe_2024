package com.example.demo.exceptions;

public class UserWithThatMailAlreadyExistException extends RuntimeException{
    public UserWithThatMailAlreadyExistException(String message) {
        super(message);
    }
}
