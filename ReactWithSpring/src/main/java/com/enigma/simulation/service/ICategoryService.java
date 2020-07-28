package com.enigma.simulation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.enigma.simulation.model.Category;

@Service
public interface ICategoryService {
	Category createCategory(Category category);
	Category updateCategory(Category category);
    List<Category> getAllCategory();
    Category findById(Integer id);
    int deleteCategory(Integer id);
    
}
