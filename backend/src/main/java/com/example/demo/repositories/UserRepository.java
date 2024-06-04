package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.username = ?1")
    Optional<User> findByUsername(String username);

    @Query("SELECT CASE WHEN COUNT(u.userId) > 0 THEN true ELSE false END FROM User u WHERE u.username = ?1")
    Boolean existsByUsername(String username);

    @Query("SELECT CASE WHEN COUNT(u.userId) > 0 THEN true ELSE false END FROM User u WHERE u.userMail = ?1")
    Boolean existsByUserMail(String userMail);

}
