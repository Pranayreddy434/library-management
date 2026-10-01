package com.library.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Library Management Backend API",
                "version", "1.0.0",
                "endpoints", Map.of(
                        "books", "/api/books",
                        "auth", "/api/auth",
                        "health", "/actuator/health"
                )
        ));
    }
}
