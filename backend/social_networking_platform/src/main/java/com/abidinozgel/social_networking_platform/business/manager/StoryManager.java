package com.abidinozgel.social_networking_platform.business.manager;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.StoryService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Story;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.StoryRepository;

@Service
public class StoryManager implements StoryService {

	private final StoryRepository storyRepository;
	
	private final UserService userService;
	
	
	
	

	public StoryManager(StoryRepository storyRepository, UserService userService) {
		super();
		this.storyRepository = storyRepository;
		this.userService = userService;
	}

	@Override
	public Story createStory(Story story, User user) {
		
		Story story2=new Story();
		
		story2.setCaption(story.getCaption());
		story2.setImage(story.getImage());
		story2.setTimeStamp(LocalDateTime.now());
		story2.setUser(user);
		
		
		
		return storyRepository.save(story2);
	}	

	@Override
	public List<Story> findStoryByUserId(Integer userId) {
		
		User user=userService.findUserById(userId);
		
				
		return storyRepository.findByUserId(userId);

	}

}
