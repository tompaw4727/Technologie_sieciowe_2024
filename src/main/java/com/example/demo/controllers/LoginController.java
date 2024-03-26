package com.example.demo.controllers;

import com.example.demo.LoginForm;
import com.example.demo.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

     private final LoginService loginService;

     @Autowired
     public LoginController(LoginService loginService) {
         this.loginService = loginService;
     }
     @PostMapping("/login")
     public ResponseEntity<String> login(@RequestBody LoginForm loginForm){
         String token = loginService.userLogin(loginForm);
         if(token==null){
             return new ResponseEntity<>("Wrong login or password", HttpStatus.UNAUTHORIZED);
         }else {
             return new ResponseEntity<>(token, HttpStatus.OK);
         }
     }


}
