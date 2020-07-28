package com.enigma.simulation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enigma.simulation.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	// QueryDSL
	User findByUserNameAndUserPassword(String UserName, String UserPassword);

//	//QueryDSL
//	User findByUserName(String userName);
//	
//	//Query Annotation
//	@Query("select u  from User u where u.userName=:userName and u.userPassword=:userPassword")
//	User authenticateUser(@Param("userName") String userName, @Param("userPassword") String userPassword);
//	
//	//Named Query
//	@Query(name = "User.doAuthenticate")
//	User doAuthenticate(@Param("userName") String userName, @Param("userPassword") String userPassword);
}
