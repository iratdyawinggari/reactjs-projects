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
import com.enigma.simulation.model.Product;
import com.enigma.simulation.service.IProductService;

@RestController
public class ProductController {
	@Autowired
	IProductService iProductService;

	@PostMapping("getProductByProductId")
	public ResponseEntity<Product> getListProductByProductId(@RequestBody Product product) {
		Product searchProduct = iProductService.getProductByProductId(product.getProductId());
		return new ResponseEntity<>(searchProduct, HttpStatus.OK);
	}

	@GetMapping("product")
	public ResponseEntity<List<Product>> getListProduct() {
		List<Product> productList = iProductService.getAllProducts();
		return new ResponseEntity<>(productList, HttpStatus.OK);
	}

	@PostMapping("addProduct")
	public ResponseEntity<Product> addProduct(@RequestBody Product product) {
		Product newProduct = iProductService.addProduct(product);
		return new ResponseEntity<>(newProduct, HttpStatus.OK);
	}

	@PostMapping("deleteProduct")
	public ResponseEntity<Integer> deleteCategoryById(@RequestBody Product product) {
		Integer Result = iProductService.deleteProduct(product.getProductId());
		return new ResponseEntity<>(Result, HttpStatus.OK);
	}

	@PostMapping("updateProduct")
	public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
		Product updateProduct = iProductService.updateProduct(product);
		return new ResponseEntity<>(updateProduct, HttpStatus.OK);
	}
}
