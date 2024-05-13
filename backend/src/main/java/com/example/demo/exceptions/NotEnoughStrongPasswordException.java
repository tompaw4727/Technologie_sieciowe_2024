package com.example.demo.exceptions;

public class NotEnoughStrongPasswordException extends RuntimeException {
    public NotEnoughStrongPasswordException(String message) {
        super(message);

    }
}
