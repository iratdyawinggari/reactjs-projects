package com.enigma.simulation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.enigma.simulation.model.Category;
import com.enigma.simulation.model.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
	@Query("select p from Product p where p.productId =:productId")
	Product getProductByProductId(@Param("productId") String productId);
	
}
