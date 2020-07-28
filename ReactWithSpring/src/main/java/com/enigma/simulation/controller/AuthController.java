package com.enigma.simulation.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enigma.simulation.model.User;
import com.enigma.simulation.service.AuthService;

@RestController
public class AuthController {
	@Autowired
	AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<User> doAuthenticate(@RequestBody User user) {
		User userInfo = authService.doAuthenticate(user);
		if (userInfo.getUserName().length() >= 0) {
			return new ResponseEntity<>(userInfo, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(userInfo, HttpStatus.UNAUTHORIZED);
		}
	}
}
