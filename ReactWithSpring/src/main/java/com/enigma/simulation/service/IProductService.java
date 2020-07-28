package com.enigma.simulation.service;

import java.util.List;

import com.enigma.simulation.model.Product;

public interface IProductService {
	List<Product> getAllProducts();

	Product addProduct(Product product);

	Product updateProduct(Product product);

	Product getProductByProductId(String productId);

	Integer deleteProduct(String productId);
}
