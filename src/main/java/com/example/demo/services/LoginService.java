package com.example.demo.services;

import com.example.demo.dto.LoginForm;
import com.example.demo.entities.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class LoginService {

    private UserService userService;

    private  PasswordEncoder passwordEncoder;

    @Value("${jwt.token.key}")
    private String key;

    @Autowired
    public LoginService(PasswordEncoder  passwordEncoder, UserService userService){
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    };
    public String userLogin(LoginForm loginForm) {
        User user = userService.getUserByUsername(loginForm.getLogin());

        if(passwordEncoder.matches(loginForm.getPassword(), user.getPassword())){
            long timeMillis = System.currentTimeMillis();
            String token = Jwts.builder()
                    .issuedAt(new Date(timeMillis))
                    .expiration(new Date(timeMillis+5*60*1000*100)) //zzmien to * 100 to tylko do testow
                    .claim("id", user.getUserId())
                    .claim("role", user.getRole())
                    .signWith(SignatureAlgorithm.HS256, key)
                    .compact();
            return token;
        }else {
            return null;
        }
    }
}
