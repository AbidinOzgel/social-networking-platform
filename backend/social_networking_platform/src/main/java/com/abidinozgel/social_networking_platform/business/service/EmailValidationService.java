package com.abidinozgel.social_networking_platform.business.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class EmailValidationService {

    private final String API_KEY = " $zerobounce key";  //
    private final String BASE_URL = "https://api.zerobounce.net/v2/validate?api_key=";

    public boolean isEmailValid(String email) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + API_KEY)
                .queryParam("email", email)
                .toUriString();
        
        RestTemplate restTemplate = new RestTemplate();
        ZeroBounceResponse response = restTemplate.getForObject(url, ZeroBounceResponse.class);

       
        return response != null && "valid".equalsIgnoreCase(response.getStatus());
    }

 
    public static class ZeroBounceResponse {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}

