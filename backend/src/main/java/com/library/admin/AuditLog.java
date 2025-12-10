package com.library.admin;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class AuditLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long actorId;
    private String actorEmail;

    private String actionType; // ADMIN_CREATED_BOOK, USER_RESERVED_BOOK, etc.
    private String entityType; // BOOK, RESERVATION, USER
    private Long entityId;

    @Column(length = 1000)
    private String details;

    private Instant createdAt;
}
