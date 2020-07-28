package com.enigma.simulation.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enigma.simulation.model.User;
import com.enigma.simulation.service.UserService;

@RestController
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping("/auth/user")
	public ResponseEntity<User> addnewUser(@RequestBody User user) {
		try {
			User newUser = userService.createUser(user);
			return new ResponseEntity<>(newUser, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new User(), HttpStatus.OK);
		}
	}
}
