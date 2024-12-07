package com.abidinozgel.social_networking_platform.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "message")
@AllArgsConstructor

public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String content;
	
	private String image; 
	
	private LocalDateTime timeStamp;
	
	@ManyToOne	
	private User user;
	
	@JsonIgnore // iki entity arasinda cift yonlu iliski kuruldugu icin responsta json sonsuz donguye girer, bunu engelemek icin ignore kullanilir
	@ManyToOne
	private Chat chat;
	
	
}
