package com.abidinozgel.social_networking_platform.business.manager;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.CommentService;
import com.abidinozgel.social_networking_platform.business.service.PostService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Comment;
import com.abidinozgel.social_networking_platform.entity.Post;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.CommentRepository;
import com.abidinozgel.social_networking_platform.repository.PostRepository;


@Service
public class CommentManager implements CommentService {

	private final PostService postService;
	
	private final UserService userService;
	
	private final CommentRepository commentRepository;
	
	private final PostRepository postRepository;

	

	

	public CommentManager(PostService postService, UserService userService, CommentRepository commentRepository,
			PostRepository postRepository) {
		super();
		this.postService = postService;
		this.userService = userService;
		this.commentRepository = commentRepository;
		this.postRepository = postRepository;
	}

	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) {

		User user=userService.findUserById(userId);
		
		Post post=postService.findPostById(postId);
		
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment saveComment=commentRepository.save(comment);
		
		post.getComments().add(saveComment);
		
		postRepository.save(post);
		
		
		return saveComment;
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) {
		
		Comment comment=findCommentById(commentId);
		
		User user=userService.findUserById(userId);
		
		if (!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		}
		else {
			comment.getLiked().remove(user);
		}
		
		Comment saveComment=commentRepository.save(comment);
		
		return saveComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) {
		
		Optional<Comment> optional= commentRepository.findById(commentId);
	
		return optional.get();
	}

}
