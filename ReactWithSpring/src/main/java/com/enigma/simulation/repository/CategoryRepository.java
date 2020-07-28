package com.enigma.simulation.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.enigma.simulation.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer>{
//    @Query("delete c from Category c where c.id=:id")
//    Category deleteCategoryById(@Param("id") Integer id);
//    
    
    @Query("select c from Category c where c.id=:id")
    Category findCategoryById(@Param("id")Integer id);
    
}
