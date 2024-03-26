package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.userName = ?1")
    Optional<User> findByUsername(String userName);

    @Query("SELECT COUNT(u.userId) From User u WHERE u.userName = ?1")
    Integer usersWithSameUsername(String userName);

    @Query("SELECT COUNT(u.userId) From User u WHERE u.userMail = ?1")
    Integer usersWithSameMail(String userMaile);

}
