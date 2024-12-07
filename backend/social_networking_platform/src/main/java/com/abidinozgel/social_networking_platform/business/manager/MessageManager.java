package com.abidinozgel.social_networking_platform.business.manager;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.ChatService;
import com.abidinozgel.social_networking_platform.business.service.MessageService;
import com.abidinozgel.social_networking_platform.entity.Chat;
import com.abidinozgel.social_networking_platform.entity.Message;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.ChatRepository;
import com.abidinozgel.social_networking_platform.repository.MessageRepository;

@Service
public class MessageManager implements MessageService {

	private final MessageRepository messageRepository;
	
	private final ChatService chatService;
	
	private final ChatRepository chatRepository;
	

	

	public MessageManager(MessageRepository messageRepository, ChatService chatService, ChatRepository chatRepository) {
		super();
		this.messageRepository = messageRepository;
		this.chatService = chatService;
		this.chatRepository = chatRepository;
	}

	@Override
	public Message createMessage(User user, Integer chatId, Message message ) {
		
		Chat chat=chatService.findChatById(chatId);	
		Message message2=new Message();
		
		
		
		message2.setChat(chat	);
		message2.setContent(message.getContent());
		message2.setImage(message.getImage());
		message2.setUser(user);
		message2.setTimeStamp(LocalDateTime.now());
		
		Message message3=messageRepository.save(message2);
		
		chat.getMessages().add(message3);
		chatRepository.save(chat);
		
		return message3;
	}

	@Override
	public List<Message> findByChatId(Integer chatId) {
		
	

		return messageRepository.findByChatId(chatId);
	}

}
