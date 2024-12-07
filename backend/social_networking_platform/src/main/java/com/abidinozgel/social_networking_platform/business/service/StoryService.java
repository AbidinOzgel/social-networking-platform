package com.abidinozgel.social_networking_platform.business.service;

import java.util.List;

import com.abidinozgel.social_networking_platform.entity.Story;
import com.abidinozgel.social_networking_platform.entity.User;

public interface StoryService {

	public Story createStory(Story story,User user);
	
	public List<Story> findStoryByUserId(Integer userId);
	
}
