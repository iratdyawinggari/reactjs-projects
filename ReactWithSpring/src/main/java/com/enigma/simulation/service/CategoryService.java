package com.enigma.simulation.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enigma.simulation.model.Category;
import com.enigma.simulation.repository.CategoryRepository;

@Service
public class CategoryService implements ICategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category createCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}

	@Override
	public Category updateCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category findById(Integer id) {
		return categoryRepository.findCategoryById(id);
	}

	@Override
	public int deleteCategory(Integer id) {
		try {
			Category category = categoryRepository.findCategoryById(id);
			categoryRepository.delete(category);
			return 1;
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return 0;
		}
	}


}
