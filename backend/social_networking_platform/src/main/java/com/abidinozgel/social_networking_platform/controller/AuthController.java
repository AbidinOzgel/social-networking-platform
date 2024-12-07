package com.abidinozgel.social_networking_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abidinozgel.social_networking_platform.business.service.CustomUserDetailsService;
import com.abidinozgel.social_networking_platform.business.service.EmailService;
import com.abidinozgel.social_networking_platform.business.service.EmailValidationService;
import com.abidinozgel.social_networking_platform.business.service.UserService;
import com.abidinozgel.social_networking_platform.config.JwtProvider;
import com.abidinozgel.social_networking_platform.entity.User;
import com.abidinozgel.social_networking_platform.repository.UserRepository;
import com.abidinozgel.social_networking_platform.request.LoginRequest;
import com.abidinozgel.social_networking_platform.response.AuthResponse;

@RestController

public class AuthController {

	public AuthController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder,
			CustomUserDetailsService customUserDetailsService) {
		super();
		this.userService = userService;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.customUserDetailsService = customUserDetailsService;
		
	}

	private final UserService userService;

	private final UserRepository userRepository;

	private PasswordEncoder passwordEncoder;

	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private EmailService emailService;

	@PostMapping("/auth/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception {
		
		EmailValidationService emailValidationService = new EmailValidationService();
		if (!emailValidationService.isEmailValid(user.getEmail())) {
			throw new Exception("Geçersiz veya aktif olmayan e-posta adresi.");
		}

		User isExist = userRepository.findByEmail(user.getEmail());
		if (isExist != null) {
			throw new Exception("Bu e-posta zaten başka bir hesapta kullanılıyor");
		}

		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));

		User savedUser = userRepository.save(newUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
				savedUser.getPassword());

		String token = JwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse(token, "Başarıyla oluşturuldu");

		return authResponse;
	}

	@PostMapping("/auth/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

		String token = JwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse(token, "giris yapildi");

		return authResponse;
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String newPassword) {
	    try {
	        
	        String email = JwtProvider.getEmailFromJwtToken(token);

	     
	        User user = userService.findUserByEmail(email);
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }

	        user.setPassword(passwordEncoder.encode(newPassword));
	        userService.updateUser(user, user.getId());

	        return ResponseEntity.ok("Password reset successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
	    }
	}
	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody String email) {
	    User user = userService.findUserByEmail(email);
	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	    }

	   
	    String resetToken = JwtProvider.generatePasswordResetToken(email);

	   
	    String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

	   
	    emailService.sendEmail(user.getEmail(), "sifre sifirlama istegi",
	            "sifre sifirlama linki: " + resetLink);

	    return ResponseEntity.ok("sifre sifirlama linki maile gonderildi");
	}


	private Authentication authenticate(String email, String password) {

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

		if (userDetails == null) {
			throw new BadCredentialsException("gecersiz email");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {

			throw new BadCredentialsException("sifre dogru degil");

		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
