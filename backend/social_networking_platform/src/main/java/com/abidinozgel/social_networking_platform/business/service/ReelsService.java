package com.abidinozgel.social_networking_platform.business.service;

import java.util.List;

import com.abidinozgel.social_networking_platform.entity.Reels;
import com.abidinozgel.social_networking_platform.entity.User;

public interface ReelsService {
	
	public Reels createReels(Reels reels,User user);
	
	public List<Reels> findAllReels();
	
	public List<Reels> findUserReels(Integer userId);

}
