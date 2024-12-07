package com.abidinozgel.social_networking_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.StoryService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Story;
import com.abidinozgel.social_networking_platform.entity.User;

@RestController
public class StoryController {

	private final StoryService storyService;
	
	private final UserService userService;

	public StoryController(StoryService storyService, UserService userService) {
		super();
		this.storyService = storyService;
		this.userService = userService;
	}

	@PostMapping("/api/story")
	public Story createStory(@RequestBody Story story,@RequestHeader("Authorization") String jwt)
	{
		User user=userService.findUserByJwt(jwt);
		
		Story story2=storyService.createStory(story, user);
		
		return story2;
	}
	
	
	@GetMapping("/api/story/user/{userId}")
	public List<Story> findStoryByUserId(@PathVariable Integer userId,@RequestHeader("Authorization") String jwt)
	{	
		
		User user=userService.findUserByJwt(jwt);
		
		List<Story> storyList=storyService.findStoryByUserId(userId);
		return storyList;
	}

}
