package com.abidinozgel.social_networking_platform.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.PostService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Post;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.response.ApiResponse;

@RestController
public class PostController {
	
	private final PostService postService;

	private final UserService userService;
	
	
	
	
	public PostController(PostService postService, UserService userService) {
		super();
		this.postService = postService;
		this.userService = userService;
	}

	@PostMapping("/api/posts")
	public ResponseEntity<Post> createPost(
			@RequestHeader("Authorization") String jwt,
				@RequestBody Post post){
		
		User user=userService.findUserByJwt(jwt);
		
		Post post2=postService.createNewPost(post,user.getId());
		return new ResponseEntity<>(post2,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/api/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost(
			@PathVariable Integer postId, 
			@RequestHeader("Authorization") String jwt)
	{
		User user=userService.findUserByJwt(jwt);
		
		String message= postService.deletePost(postId,user.getId());
		
		ApiResponse response=new ApiResponse(message,true);
		
		return new ResponseEntity<ApiResponse>(response,HttpStatus.OK);	
	}
	
	@GetMapping("/api/posts/{postId}")
	public ResponseEntity<Post> findPostById(@PathVariable Integer postId) {
		
		Post post=postService.findPostById(postId);
		
		return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/posts/user/{userId}")
	public ResponseEntity<List<Post>> findPostByUserId(@PathVariable Integer userId)
	{
		List<Post> posts= postService.findPostByUserId(userId);
		
		return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
	}
	
	@GetMapping("/api/posts")
	public ResponseEntity<List<Post>> findAllPost() {
		
		List<Post> posts= postService.findAllPost();
		
		return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
		
	}
	
	@PutMapping("/api/posts/save/{postId}")
	public ResponseEntity<Post> savedPost(
			@PathVariable Integer postId,
			@RequestHeader("Authorization") String jwt)
	{
		User user=userService.findUserByJwt(jwt);
		Post post =postService.savedPost(postId, user.getId());
		
		return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/api/posts/like/{postId}")
	public ResponseEntity<Post> likePost(
			@PathVariable Integer postId,
			@RequestHeader("Authorization") String jwt)
	{
		
		User user=userService.findUserByJwt(jwt);
		Post post=postService.likePost(postId, user.getId());
		
		return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
	}
	
	
	
	
	
	

}
