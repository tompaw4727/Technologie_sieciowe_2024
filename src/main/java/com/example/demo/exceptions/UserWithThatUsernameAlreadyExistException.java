package com.example.demo.exceptions;

public class UserWithThatUsernameAlreadyExistException extends RuntimeException {

    public UserWithThatUsernameAlreadyExistException(String message) {
        super(message);
    }
}
