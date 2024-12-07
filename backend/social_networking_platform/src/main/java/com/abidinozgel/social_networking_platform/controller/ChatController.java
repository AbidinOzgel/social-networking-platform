package com.abidinozgel.social_networking_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.ChatService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Chat;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.request.CreateChatRequest;

import jakarta.persistence.GeneratedValue;

@RestController
public class ChatController {
	
	private final ChatService chatService;
	
	
	private final UserService userService;
			
	



	public ChatController(ChatService chatService, UserService userService) {
		super();
		this.chatService = chatService;
		this.userService = userService;
	}





	@PostMapping("/api/chats")
	public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody CreateChatRequest createChatRequest)
	{
		User user1=userService.findUserByJwt(jwt);
		
		User user2=userService.findUserById(createChatRequest.getUserId());
		Chat chat=chatService.createChat(user1	, user2);
				
		
		return chat;
	}
	
	@GetMapping("/api/chats")
	public List<Chat> findUserChat(@RequestHeader("Authorization") String jwt)
	{
		
		User user=userService.findUserByJwt(jwt);
		
		
		List<Chat> chats=chatService.findUsersChat(user.getId());
		return chats;
	}
	

}
