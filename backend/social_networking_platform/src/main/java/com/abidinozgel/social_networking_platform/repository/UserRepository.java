package com.abidinozgel.social_networking_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.abidinozgel.social_networking_platform.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByEmail(String email);
	
	
	 @Query("SELECT u FROM User u WHERE u.firstName LIKE %:search% OR u.lastName LIKE %:search%")
	 public   List<User> searchUser(@Param("search") String search);
	

}
