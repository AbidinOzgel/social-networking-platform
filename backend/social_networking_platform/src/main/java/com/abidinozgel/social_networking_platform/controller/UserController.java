package com.abidinozgel.social_networking_platform.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;

	private final UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@GetMapping("/api/users")
	public List<User> getUsers() {
		List<User> users = userRepository.findAll();

		return users;

	}

	@GetMapping("/api/users/{userId}")
	public User getUserById(@PathVariable Integer userId) {

		User user = userService.findUserById(userId);

		return user;
	}

	@PutMapping("/api/users")
	public User updateUser(@RequestHeader("Authorization") String jwt ,@RequestBody User user) {

		User newUser=userService.findUserByJwt(jwt);	
		
			User updatedUser = userService.updateUser(user, newUser.getId());

		return updatedUser;

	}

	@DeleteMapping("/api/users/{userId}")
	public String deleteUser(@PathVariable Integer userId) {

		Optional<User> optional = userRepository.findById(userId);

		userRepository.delete(optional.get());

		return "user deleted with id " + userId;
	}

	@PutMapping("/api/users/follow/{userId2}")
	public User followUser(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) {

		User user1=userService.findUserByJwt(jwt);
			
		User user = userService.followUser(user1.getId(), userId2);

		return user;
	}

	@GetMapping("/api/users/search")
	public List<User> searchUser(@RequestParam("query") String query) {
		List<User> users = userService.searchUser(query);

		return users;
	}

	@GetMapping("/api/users/profile")
	public User getUserFromToken(@RequestHeader("Authorization") String jwt) {

		User user = userService.findUserByJwt(jwt);

		return user;

	}

}
