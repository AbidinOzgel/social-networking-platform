package com.abidinozgel.social_networking_platform.business.manager;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.PostService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Post;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.PostRepository;
import com.abidinozgel.social_networking_platform.repository.UserRepository;


@Service
public class PostManager implements PostService {

	private final PostRepository postRepository;

	private final UserService userService;
	
	private final UserRepository userRepository;



	public PostManager(PostRepository postRepository, UserService userService, UserRepository userRepository) {
		super();
		this.postRepository = postRepository;
		this.userService = userService;
		this.userRepository = userRepository;
	}

	@Override
	public Post createNewPost(Post post, Integer userId) {

		Post newPost = new Post();

		User user = userService.findUserById(userId);
		
		

		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		postRepository.save(newPost);

		return newPost;
	}

	@Override
	public String deletePost(Integer postId, Integer userId) {

		Post post = findPostById(postId);

		User user = userService.findUserById(userId);

		if (post.getUser().getId() != user.getId()) {

			throw new RuntimeException("baskasinin fotografini silemezsin");
		}

		postRepository.delete(post);
		return "post silindi";

	}

	@Override
	public List<Post> findPostByUserId(Integer userId) {

		return postRepository.findByUserId(userId);
	}

	@Override
	public Post findPostById(Integer postId) {

		Optional<Post> optional = postRepository.findById(postId);

		return optional.get();

	}

	@Override
	public List<Post> findAllPost() {
		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) {
		
		Post post=findPostById(postId);
		
		User user=userService.findUserById(userId);
		
		if (user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		}
		else {
			user.getSavedPost().add(post);
		}
		
		userRepository.save(user);
		
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) {

		Post post = findPostById(postId);

		User user = userService.findUserById(userId);

		if (post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		}

		else {
			post.getLiked().add(user);
		}

		
		userRepository.save(user);
		
		return postRepository.save(post);
	}

}
