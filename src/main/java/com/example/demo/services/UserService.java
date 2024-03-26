package com.example.demo.services;

import com.example.demo.entities.User;
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

    public User addUser(User user) {
        user.setPassword(passwordConfig.passwordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers () {
        return userRepository.findAll();
    }

    public User getUserByUsername(String userName) {
        Optional<User> optionalUser = userRepository.findByUsername(userName);
        return optionalUser.orElse(null);
    }

    public String deleteUser(Integer userId) {
        userRepository.deleteById(userId);
        return "User succesfully delete";
    }

    public boolean checkIfUserExistById(Integer Id){

        return !userRepository.existsById(Id);
    }

    public boolean checkIfUserExistByUsername(String userName){
        if (userRepository.usersWithSameUsername(userName) > 0 ) {
            return true;
        }else {
            return false;
        }
    }

    public boolean checkIfUserExistByMail(String userMail){
        if (userRepository.usersWithSameMail(userMail) > 0 ) {
            return true;
        }else {
            return false;
        }
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
