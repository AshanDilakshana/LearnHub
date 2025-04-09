package com.paf.learnhub.controllers;

import com.paf.learnhub.models.User;
import com.paf.learnhub.Services.UserService;
import com.paf.learnhub.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/login/oauth2/code/{provider}")
    public ResponseEntity<Void> oauth2Login(OAuth2AuthenticationToken token) {
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

        String jwtToken = jwtUtil.generateToken(user.getId());
        String redirectUrl = "http://localhost:3000/?token=" + jwtToken;

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(redirectUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        User user = userService.findByEmail(loginUser.getEmail());
        if (user != null && new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().matches(loginUser.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getId());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User newUser) {
        if (userService.findByEmail(newUser.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        User savedUser = userService.saveUser(newUser);
        String token = jwtUtil.generateToken(savedUser.getId());
        return ResponseEntity.ok(token);
    }
}