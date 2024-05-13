package com.example.demo.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.token.key}")
    private String key;

    //w bazie danych role zapisuje sie ROLE_NAZWA
    // w konfiguracji role zapisuje sie NAZWA
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(AbstractHttpConfigurer:: disable)
                .addFilterBefore(new JWTTokenFilter(key), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        .requestMatchers("/login").permitAll()
                                        .requestMatchers("/book/search").hasRole("USER")
                                        .requestMatchers("/loan/add").hasRole("USER")
                                        .requestMatchers("/loan/history/**").hasRole("USER")
                                        .requestMatchers("/review/add").hasRole("USER")
                                        .requestMatchers("/user/**").hasRole("EMPLOYEE")
                                        .requestMatchers("/book/**").hasRole("EMPLOYEE")
                                        .requestMatchers("/loan/acceptloan/**").hasRole("EMPLOYEE")
                                        .requestMatchers("/loan/acceptreturn/**").hasRole("EMPLOYEE")
                )
                .sessionManagement( sessionMenegment ->
                        sessionMenegment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

}
