package com.enigma.simulation.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.enigma.simulation.model.User;
import com.enigma.simulation.repository.UserRepository;

@Service
public class AuthService {
	@Autowired
	UserRepository userRepository;

	public User doAuthenticate(User user) {
		return userRepository.findByUserNameAndUserPassword(user.getUserName(), user.getUserPassword());
	}
}
