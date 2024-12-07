package com.abidinozgel.social_networking_platform.business.service;



import com.abidinozgel.social_networking_platform.entity.Comment;

public interface CommentService {
	
	public Comment 	createComment(Comment comment,
			Integer postId,
			Integer userId);
	

	
	public Comment likeComment(Integer commentId,Integer userId);
	
	public Comment findCommentById(Integer commentId);

}
