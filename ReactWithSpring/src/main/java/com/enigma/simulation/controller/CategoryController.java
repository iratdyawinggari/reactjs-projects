package com.enigma.simulation.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enigma.simulation.model.Category;
import com.enigma.simulation.service.CategoryService;
import com.enigma.simulation.service.ICategoryService;

@RestController
public class CategoryController {
	@Autowired
	ICategoryService iCategoryService;

	@PostMapping("deleteCategory")
	public ResponseEntity<Integer> deleteCategoryById(@RequestBody Category category) {
		Integer Result = iCategoryService.deleteCategory(category.getId());
		return new ResponseEntity<>(Result, HttpStatus.OK);
	}

	@GetMapping("category")
	public ResponseEntity<List<Category>> getListCategory() {
		List<Category> listCategory = iCategoryService.getAllCategory();
		return new ResponseEntity<>(listCategory, HttpStatus.OK);
	}

	@PostMapping("addCategory")
	public ResponseEntity<Category> addCategory(@RequestBody Category category) {
		Category newCategory = iCategoryService.createCategory(category);
		return new ResponseEntity<>(newCategory, HttpStatus.OK);
	}
	
	@PostMapping("findCategoryById")
	public ResponseEntity<Category> search(@RequestBody Category category) {
		Category searchCategory = iCategoryService.findById(category.getId());
		return new ResponseEntity<>(searchCategory, HttpStatus.OK);
	}


	@PostMapping("updateCategory")
	public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
		Category updateCategory = iCategoryService.updateCategory(category);
		return new ResponseEntity<>(updateCategory, HttpStatus.OK);
	}
}
