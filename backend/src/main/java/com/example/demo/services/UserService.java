package com.example.demo.services;

import com.example.demo.dto.UserAddForm;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.exceptions.NotEnoughStrongPasswordException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UserWithThatMailAlreadyExistException;
import com.example.demo.exceptions.UserWithThatUsernameAlreadyExistException;
import com.example.demo.repositories.UserRepository;
import com.example.demo.security.PasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.regex.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;
    private PasswordConfig passwordConfig;

    @Autowired
    public UserService(UserRepository userRepository, PasswordConfig passwordConfig) {

        this.passwordConfig = passwordConfig;
        this.userRepository = userRepository;
    }

    public String addUser(UserAddForm userAddForm) {
        if (userRepository.existsByUsername(userAddForm.getUsername())) {
            throw new UserWithThatUsernameAlreadyExistException("User with that username already exists in database.");
        }else if (userRepository.existsByUserMail(userAddForm.getUserMail())) {
            throw new UserWithThatMailAlreadyExistException("User with that mail already exists in database.");

        }else if (!checkIfPasswordIsStrong(userAddForm.getPassword())) {
            throw new NotEnoughStrongPasswordException("Password is not strong enough");
        } else {
            userAddForm.setPassword(passwordConfig.passwordEncoder().encode(userAddForm.getPassword()));

            User user = new User();
            user.setUsername(userAddForm.getUsername());
            user.setPassword(userAddForm.getPassword());
            user.setUserMail(userAddForm.getUserMail());
            user.setFullName(userAddForm.getFullName());
            user.setRole(userAddForm.getRole());

            userRepository.save(user);
            return "User succesfully added";
        }

    }

    public List<User> getAllUsers () {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }

    public String updateUser(Integer userId, UserDTO userDTO) {
        User user  = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User with that Id doesn't exists in database"));


        if (userDTO.getUsername() != null) {
            if (!user.getUsername().equals(userDTO.getUsername()) && userRepository.existsByUsername(userDTO.getUsername())) {
                throw new UserWithThatUsernameAlreadyExistException("User with that username already exists in the database.");
            }
            user.setUsername(userDTO.getUsername());
        }

        if (userDTO.getPassword() != null) {
            if (!checkIfPasswordIsStrong(userDTO.getPassword())) {
                throw new NotEnoughStrongPasswordException("Password is not strong enough");
            }
            user.setPassword(passwordConfig.passwordEncoder().encode(userDTO.getPassword()));
        }

        if(userDTO.getRole() == null) {
            user.setRole(user.getRole());
        }else {
            user.setRole(userDTO.getRole());
        }

        if(userDTO.getUserMail() != null) {
            if (!user.getUserMail().equals(userDTO.getUserMail()) && userRepository.existsByUserMail(userDTO.getUserMail())) {
                throw new UserWithThatMailAlreadyExistException("User with that mail already exists in database.");
            }
            user.setUserMail(userDTO.getUserMail());
        }

        if(userDTO.getFullName() == null) {
            user.setFullName(user.getFullName());
        }else {
            user.setFullName(userDTO.getFullName());
        }

        if(userDTO.getLoans() == null) {
            user.setLoans(user.getLoans());
        }else {
            user.setLoans(userDTO.getLoans());
        }

        if(userDTO.getReviews() == null) {
            user.setReviews(user.getReviews());
        }else {
            user.setReviews(userDTO.getReviews());
        }



        return "Succesfully updated user with Id:  " + userId;

    }

    public String deleteUser(Integer userId) {
        userRepository.deleteById(userId);
        return "User succesfully delete";
    }

    public boolean checkIfUserExistById(Integer Id){

        return !userRepository.existsById(Id);
    }


    public boolean checkIfPasswordIsStrong(String password) {
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!_()\\\\-]).+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        boolean matchFound = matcher.find();

        if(password.length() >= 8 && matchFound ) {
            return true;
        }else {
            return false;
        }
    }
}
