package com.abidinozgel.social_networking_platform.business.service;

import java.util.List;

import com.abidinozgel.social_networking_platform.entity.Message;
import com.abidinozgel.social_networking_platform.entity.User;

public interface MessageService {
	
	public Message createMessage(User user,Integer chatId,Message message);
	
	public List<Message> findByChatId(Integer chatId);

}
