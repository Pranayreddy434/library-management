package com.library.auth;

import lombok.Data;

@Data
class LoginRequest {
    private String email;
    private String password;
}

