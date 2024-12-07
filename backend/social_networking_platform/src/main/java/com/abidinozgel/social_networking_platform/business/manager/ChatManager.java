package com.abidinozgel.social_networking_platform.business.manager;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.ChatService;
import com.abidinozgel.social_networking_platform.entity.Chat;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.ChatRepository;

@Service
public class ChatManager implements ChatService{

	private final ChatRepository chatRepository;
	
	
	public ChatManager(ChatRepository chatRepository) {
		super();
		this.chatRepository = chatRepository;
	}

	@Override
	public Chat createChat(User user1, User user2) {
		
		Chat chat=chatRepository.findChatByUSersId(user2, user1);
		
		if (chat!=null) {
			return chat;
		}
		
		Chat newChat=new Chat();
		
		newChat.getUsers().add(user2);
		
		newChat.getUsers().add(user1);
		
		newChat.setTimeStamp(LocalDateTime.now());
		
		return chatRepository.save(newChat);
		
		
	}

	@Override
	public Chat findChatById(Integer chatId) {
		
		Optional<Chat> optional=chatRepository.findById(chatId);
		
		
		
		return optional.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) {
		
		return chatRepository.findByUsersId(userId);
	}

}
