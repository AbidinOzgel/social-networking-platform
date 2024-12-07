package com.abidinozgel.social_networking_platform.business.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private UserRepository userRepository;

	public CustomUserDetailsService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(username);

		if (user == null) {
			throw new UsernameNotFoundException("bu emaile sahip kullanici bulunamadi " + username);
		}

		List<GrantedAuthority> authorities = new ArrayList<>();

		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);

	}

}
