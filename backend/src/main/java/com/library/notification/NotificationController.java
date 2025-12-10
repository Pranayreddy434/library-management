package com.library.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService service;

    @GetMapping
    public List<Notification> list() {
        return service.myNotifications();
    }

    @PutMapping("/{id}/read")
    public void markRead(@PathVariable Long id) {
        service.markRead(id);
    }
}
