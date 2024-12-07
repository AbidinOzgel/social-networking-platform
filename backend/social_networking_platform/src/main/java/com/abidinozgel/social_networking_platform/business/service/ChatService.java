package com.abidinozgel.social_networking_platform.business.service;

import java.util.List;

import com.abidinozgel.social_networking_platform.entity.Chat;
import com.abidinozgel.social_networking_platform.entity.User;

public interface ChatService {
	
	public Chat createChat(User user1,User user2);
	
	public Chat findChatById(Integer chatId);
	
	public List<Chat> findUsersChat(Integer userId);

}
