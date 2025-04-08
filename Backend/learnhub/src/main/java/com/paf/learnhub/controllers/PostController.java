package com.paf.learnhub.controllers;

import com.paf.learnhub.models.Post;
import com.paf.learnhub.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        Post post = postService.getPostById(id);
        return post != null ? ResponseEntity.ok(post) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post) {
        Post existingPost = postService.getPostById(id);
        if (existingPost != null) {
            existingPost.setDescription(post.getDescription());
            return ResponseEntity.ok(postService.updatePost(existingPost));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Post> likePost(@PathVariable String id, @RequestBody String userId) {
        Post post = postService.getPostById(id);
        if (post != null) {
            post.getLikes().add(userId);
            return ResponseEntity.ok(postService.updatePost(post));
        }
        return ResponseEntity.notFound().build();
    }
}