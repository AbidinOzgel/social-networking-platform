package com.abidinozgel.social_networking_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.MessageService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.entity.Message;
import com.abidinozgel.social_networking_platform.entity.User;

@RestController
public class CreateMessageController {

	private final MessageService messageService;
	
	private final UserService userService;

	public CreateMessageController(MessageService messageService, UserService userService) {
		super();
		this.messageService = messageService;
		this.userService = userService;
	}
	
	@PostMapping("/api/messages/chat/{chatId}")
	public Message createMessage(@RequestBody Message message,
			@RequestHeader("Authorization") String jwt,
			@PathVariable Integer chatId
			)
	{
		User user=userService.findUserByJwt(jwt);
		
		Message message2=messageService.createMessage(user,chatId, message);
		
		return message2;
	}
	
	@GetMapping("/api/messages/chat/{chatId}")
	public List<Message> findChatsMessages(@RequestHeader("Authorization") String jwt,@PathVariable Integer chatId)
	{
		
		User user=userService.findUserByJwt(jwt);
		
		List<Message> messages=messageService.findByChatId(chatId);
		
		return messages;
	}
	
	
	
	
	
	
}
