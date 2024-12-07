package com.abidinozgel.social_networking_platform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.abidinozgel.social_networking_platform.entity.Chat;
import com.abidinozgel.social_networking_platform.entity.User;


public interface ChatRepository extends JpaRepository<Chat,Integer> {
	
	public List<Chat> findByUsersId(Integer userId);
	
	
	@Query("select c from Chat c where :user1 Member of c.users And :user2 Member of c.users")
	public Chat findChatByUSersId(@Param("user1") User user1,@Param("user2") User user2);
	
	
	

}
