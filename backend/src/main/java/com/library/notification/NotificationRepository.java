package com.library.notification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.user.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	List<Notification>findByUserAndReadFalse(User user);
}
