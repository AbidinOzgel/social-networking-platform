package com.abidinozgel.social_networking_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.ReelsService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Reels;
import com.abidinozgel.social_networking_platform.entity.User;

import jakarta.persistence.GeneratedValue;

@RestController
public class ReelsController {
	
	private final ReelsService reelsService;
	
	private final UserService userService;

	public ReelsController(ReelsService reelsService, UserService userService) {
		super();
		this.reelsService = reelsService;
		this.userService = userService;
	}
	
	@PostMapping("/api/reels")
	public Reels createReels(@RequestBody Reels reels,@RequestHeader("Authorization") String jwt)
	{
		
		User user=userService.findUserByJwt(jwt);
		
		Reels reels2=reelsService.createReels(reels, user);
		
		return reels2;
		
		
	}
	
	@GetMapping("/api/reels")
	public List<Reels> findAllReels()
	{
		List<Reels> reels=reelsService.findAllReels();
		
		return reels;
	}
	
	@GetMapping("/api/reels/user/{userId}")
	public List<Reels> findUserReels(@PathVariable Integer userId)
	{
		List<Reels> reels=reelsService.findUserReels(userId);
		
		return reels;
	}
	
	
	
	

}
