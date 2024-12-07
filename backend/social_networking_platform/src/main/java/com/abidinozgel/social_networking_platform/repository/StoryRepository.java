package com.abidinozgel.social_networking_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abidinozgel.social_networking_platform.entity.Story;

@Repository
public interface StoryRepository extends JpaRepository<Story, Integer >{
	
	public List<Story> findByUserId(Integer userId);

}
