package com.abidinozgel.social_networking_platform.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;

import com.abidinozgel.social_networking_platform.business.service.CommentService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Comment;
import com.abidinozgel.social_networking_platform.entity.User;

@RestController
public class CommentController {
	
	private final CommentService commentService;

	private final UserService userService;

	public CommentController(CommentService commentService, UserService userService) {
		super();
		this.commentService = commentService;
		this.userService = userService;
	}
	
	@PostMapping("/api/comments/post/{postId}")
	public Comment createComment(@RequestBody Comment comment,
			@RequestHeader("Authorization") String jwt,
			@PathVariable Integer postId)
	{
		User user=userService.findUserByJwt(jwt);
		
		Comment comment2=commentService.createComment(comment, postId, user.getId());
		
		
		return comment2;
	}
	
	@PutMapping("/api/comments/like/{commentId}")
	public Comment likeComment(@RequestHeader("Authorization") String jwt,@PathVariable Integer commentId)
	{
		
		User user=userService.findUserByJwt(jwt);
		
		Comment comment=commentService.likeComment(commentId, user.getId());
		
		return comment;
	}
	
	
	
	

}
