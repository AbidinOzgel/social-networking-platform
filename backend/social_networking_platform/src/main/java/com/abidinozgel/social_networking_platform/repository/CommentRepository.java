package com.abidinozgel.social_networking_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abidinozgel.social_networking_platform.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{

}
