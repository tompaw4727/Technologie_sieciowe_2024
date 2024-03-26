package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(UserWithThatUsernameAlreadyExistException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ErrorMessage UserWithThatUsernameAlreadyExistException(UserWithThatUsernameAlreadyExistException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.CONFLICT.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };

    @ExceptionHandler(UserWithThatMailAlreadyExistException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ErrorMessage UserWithThatMailAlreadyExistException(UserWithThatMailAlreadyExistException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.CONFLICT.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };

    @ExceptionHandler(NotEnoughStrongPasswordException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage NotEnoughStrongPasswordException(NotEnoughStrongPasswordException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage ResourceNotFoundException(ResourceNotFoundException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage IllegalArgumentException(IllegalArgumentException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };

    @ExceptionHandler(InvalidDateException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage InvalidYearException(InvalidDateException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };

    @ExceptionHandler(InvalidScoreException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage InvalidScoreException(InvalidScoreException e) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                e.getMessage()
        );
        return message;
    };
}
