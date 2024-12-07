package com.abidinozgel.social_networking_platform.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String firstName;
	
	private String lastName;

	private String email;

	private String password;
	
	private String gender;
	
	private String profile;
	
	private String back_ground;
	
	private List<Integer> followers=new ArrayList<>();
	
	private List<Integer> followings=new ArrayList<>();
	
	
	@ManyToMany
    @JoinTable(
        name = "saved_posts",
        joinColumns =@JoinColumn(name="user_id"),
        inverseJoinColumns = @JoinColumn(name = "post_id")
    )
	private List<Post> savedPost=new ArrayList<>();
	

}
