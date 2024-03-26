package com.example.demo.repositories;

import com.example.demo.entities.BookDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface BookDetailsRepository extends JpaRepository<BookDetails, Integer> {
}
