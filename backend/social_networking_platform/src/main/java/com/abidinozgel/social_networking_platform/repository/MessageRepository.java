package com.abidinozgel.social_networking_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abidinozgel.social_networking_platform.entity.Message;

public interface MessageRepository  extends JpaRepository<Message, Integer>{
	
	public List<Message> findByChatId(Integer chatId);

}
