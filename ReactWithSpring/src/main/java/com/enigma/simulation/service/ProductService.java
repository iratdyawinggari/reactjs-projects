package com.enigma.simulation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enigma.simulation.model.Product;
import com.enigma.simulation.repository.ProductRepository;

@Service
public class ProductService implements IProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product addProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public Product getProductByProductId(String productId) {
		return productRepository.getProductByProductId(productId);
	}

	@Override
	public Integer deleteProduct(String productId) {
		try {
			Product product = productRepository.getProductByProductId(productId);
			productRepository.delete(product);
			return 1;
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return 0;
		}
	}

}
