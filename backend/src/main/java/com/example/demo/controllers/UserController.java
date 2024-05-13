package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.exceptions.NotEnoughStrongPasswordException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UserWithThatMailAlreadyExistException;
import com.example.demo.exceptions.UserWithThatUsernameAlreadyExistException;
import com.example.demo.services.UserService;
import jakarta.transaction.Transactional;
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

        return userService.addUser(user);
    }

    @PutMapping("/update/{userId}")
    @Transactional
    public String updateUSer(@PathVariable("userId") Integer userId,
                             @RequestBody UserDTO userDTO) {

        return userService.updateUser(userId, userDTO);
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
