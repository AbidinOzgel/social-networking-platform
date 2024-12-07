package com.abidinozgel.social_networking_platform.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {

	private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

	public static String generateToken(Authentication authentication) {
		String jwt = Jwts.builder()
				.setIssuer("social_networking_platform")
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + 3600000))
				.claim("email", authentication.getName())
				.signWith(key)
				.compact();

		return jwt;
	}
	
	public static String getEmailFromJwtToken(String jwt)
	{
	
		jwt=jwt.substring(7);
		
		Claims claims=Jwts.parserBuilder()
				.setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		
		
		String email=String.valueOf(claims.get("email"));
		
		return email;
	}
	
	public static String generatePasswordResetToken(String email) {
	    String jwt = Jwts.builder()
	            .setIssuer("social_networking_platform")
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(new Date().getTime() + 3600000)) // 1 saat geçerli
	            .claim("email", email)
	            .signWith(key)
	            .compact();

	    return jwt;
	}


}
