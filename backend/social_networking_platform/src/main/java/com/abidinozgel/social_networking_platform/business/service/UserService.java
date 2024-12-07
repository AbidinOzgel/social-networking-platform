package com.abidinozgel.social_networking_platform.business.service;

import java.util.List;

import com.abidinozgel.social_networking_platform.entity.User;

public interface UserService {
	
	public User registerUser(User user);
	
	public User findUserById(Integer userId);
	
	public User findUserByEmail(String email);
	
	public User followUser(Integer userId1,Integer userId2);
	
	public User updateUser(User user,Integer userId);
	
	public List<User> searchUser(String Query);
	
	public User findUserByJwt(String jwt);
	
	
	
	

}
