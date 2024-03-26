package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.exceptions.NotEnoughStrongPasswordException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UserWithThatMailAlreadyExistException;
import com.example.demo.exceptions.UserWithThatUsernameAlreadyExistException;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public @ResponseBody User addUser(@RequestBody User user) {
        if (userService.checkIfUserExistByUsername(user.getUserName())) {
            throw new UserWithThatUsernameAlreadyExistException("User with that username already exists in database.");
        } else if (userService.checkIfUserExistByMail(user.getUserMail())) {
            throw new UserWithThatMailAlreadyExistException("User with that mail already exists in database.");
        } else if(!userService.checkIfPasswordIsStrong(user.getPassword())) {
            throw new NotEnoughStrongPasswordException("Password is not strong enough");
        } else {
            return userService.addUser(user);
        }
    }

    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId ){
        if(userService.checkIfUserExistById(userId)){
            throw new ResourceNotFoundException("User with that Id doesn't exists in database.");
        }else {
            return userService.deleteUser(userId);
        }
    }

    @GetMapping("/getAll")
    public @ResponseBody Iterable<User> getAllUsers(){
        return userService.getAllUsers();
    }


}
