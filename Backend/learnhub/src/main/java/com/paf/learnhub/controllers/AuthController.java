package com.paf.learnhub.controllers;

import com.paf.learnhub.models.User;
import com.paf.learnhub.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/login/oauth2/code/{provider}")
    public ResponseEntity<User> oauth2Login(OAuth2AuthenticationToken token) {
        String provider = token.getAuthorizedClientRegistrationId(); // "google" or "github"
        String email = token.getPrincipal().getAttribute("email");
        String name = token.getPrincipal().getAttribute("name");

        User user = userService.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setProvider(provider);
            user.setProviderId(token.getPrincipal().getAttribute("sub"));
            user = userService.saveUser(user);
        }
        return ResponseEntity.ok(user);
    }

    // Add email/password login with JWT (implementation omitted for brevity)
}