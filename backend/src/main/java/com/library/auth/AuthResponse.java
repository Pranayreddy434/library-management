package com.library.auth;

import lombok.Data;

@Data
class AuthResponse {
    private String token;
    private String role;
    private String email;
    private String name;
}