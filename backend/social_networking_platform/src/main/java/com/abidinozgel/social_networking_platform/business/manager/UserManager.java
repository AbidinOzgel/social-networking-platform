package com.abidinozgel.social_networking_platform.business.manager;

import java.util.List;
import java.util.Optional;

import org.hibernate.query.NativeQuery.ReturnableResultNode;
import org.springframework.stereotype.Service;

import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.config.JwtProvider;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.UserRepository;

@Service
public class UserManager implements UserService {

	private final UserRepository userRepository;

	public UserManager(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public User registerUser(User user) {

		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(user.getPassword());
		newUser.setId(user.getId());
		newUser.setProfile(user.getProfile());
		newUser.setBack_ground(user.getBack_ground());

		User savedUser = userRepository.save(newUser);
		

		return savedUser;
		

	}

	@Override
	public User findUserById(Integer userId) {
		Optional<User> optional = userRepository.findById(userId);
		return optional.get();
	}

	@Override
	public User findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);

		return user;
	}

	@Override
	public User followUser(Integer userId1, Integer userId2) {

		User user1 = findUserById(userId1);
		User user2 = findUserById(userId2);

		user2.getFollowers().add(userId1);
		user1.getFollowings().add(userId2);

		userRepository.save(user1);
		userRepository.save(user2);
		return user1;
	
	}
	
	
	@Override
	public User updateUser(User user, Integer userId) {
		Optional<User> user1 = userRepository.findById(userId);

		User dbUser = user1.get();
		if (user.getFirstName() != null) {
			dbUser.setFirstName(user.getFirstName());
		}
		if (user.getLastName() != null) {
			dbUser.setLastName(user.getLastName());
		}
		if (user.getEmail() != null) {
			dbUser.setEmail(user.getEmail());
		}
		
		if (user.getGender()!=null) {
			dbUser.setGender(user.getGender());
		}
		if (user.getProfile()!=null) {
			dbUser.setProfile(user.getProfile());
		}
		if (user.getBack_ground()!=null) {
			dbUser.setBack_ground(user.getBack_ground());
		}

		User updatedUser = userRepository.save(dbUser);

		return updatedUser;
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);
	}

	@Override
	public User findUserByJwt(String jwt) {

		String email = JwtProvider.getEmailFromJwtToken(jwt);

		User user = userRepository.findByEmail(email);

		return user;
	}

}
