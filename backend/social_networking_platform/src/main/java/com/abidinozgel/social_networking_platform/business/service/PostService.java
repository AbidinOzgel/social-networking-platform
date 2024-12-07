package com.abidinozgel.social_networking_platform.business.service;

import java.util.List;

import com.abidinozgel.social_networking_platform.entity.Post;

public interface PostService {
	
	public Post createNewPost(Post post,Integer userId);
	
	public String deletePost(Integer postId, Integer userId);
	
	public List<Post> findPostByUserId(Integer userId);
	
	public Post findPostById(Integer postId);
	
	public List<Post> findAllPost();
	
	public Post savedPost(Integer postId,Integer userId);	
	
	public Post likePost(Integer postId,Integer userId);
	
	
	
	

}
