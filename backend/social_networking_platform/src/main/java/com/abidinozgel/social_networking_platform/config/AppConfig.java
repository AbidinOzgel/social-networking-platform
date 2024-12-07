package com.abidinozgel.social_networking_platform.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class AppConfig {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
	{
		
		http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		
		
		.authorizeHttpRequests(x->x
				.requestMatchers("/api/**").authenticated()
				.anyRequest().permitAll())
		.addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
		.csrf(csrf->csrf.disable())
		.cors(cfg->cfg.configurationSource(configurationSource()))
		
		.httpBasic(Customizer.withDefaults());
		
		
		return http.build();
	}
	
	
	private CorsConfigurationSource configurationSource()
	{
		return new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest arg0) {
				
				CorsConfiguration 	cors=new CorsConfiguration();
				
				cors.setAllowedOriginPatterns(Arrays.asList(
						"http://localhost:3000/"));
				cors.setAllowedMethods(Collections.singletonList("*"));
				cors.setAllowCredentials(true);
				cors.setAllowedHeaders(Collections.singletonList("*"));
				cors.setExposedHeaders(Arrays.asList(
						"Authorization"));
				cors.setMaxAge(3600L);
				
				 	
				return cors;
			}
		};
	}
	
	
	@Bean
	PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	

}
