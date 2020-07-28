package com.enigma.simulation.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enigma.simulation.model.User;
import com.enigma.simulation.repository.UserRepository;

@Service
@Transactional
public class UserService implements IUserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}
}
