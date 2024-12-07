package com.abidinozgel.social_networking_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abidinozgel.social_networking_platform.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{
	
	public  List<Post> findByUserId(Integer userId);

}
