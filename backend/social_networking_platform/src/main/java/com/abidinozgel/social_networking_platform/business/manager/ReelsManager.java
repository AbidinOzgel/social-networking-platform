package com.abidinozgel.social_networking_platform.business.manager;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.ReelsService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Reels;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.ReelsRepository;

@Service
public class ReelsManager implements ReelsService {

	private final ReelsRepository reelsRepository;
	
	
	private final UserService userService;
	
	
	
	public ReelsManager(ReelsRepository reelsRepository, UserService userService) {
		super();
		this.reelsRepository = reelsRepository;
		this.userService = userService;
	}

	@Override
	public Reels createReels(Reels reels, User user) {
		
		Reels reels2=new Reels();
		
		reels2.setTitle(reels.getTitle());
		reels2.setUser(user);
		reels2.setVideo(reels.getVideo());
		
		
		return reelsRepository.save(reels2);
	}

	@Override
	public List<Reels> findAllReels() {
		
		return reelsRepository.findAll();
	}

	@Override
	public List<Reels> findUserReels(Integer userId) {
		
		userService.findUserById(userId);
		
		return reelsRepository.findByUserId(userId);
		
	
	}
	
	

}
