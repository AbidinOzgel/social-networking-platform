package com.abidinozgel.social_networking_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.entity.Reels;

@Repository
public interface ReelsRepository extends JpaRepository<Reels, Integer> {

	
	public List<Reels> findByUserId(Integer userId);
	
}
