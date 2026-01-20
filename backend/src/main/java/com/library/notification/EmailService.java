package com.library.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // OTP (already exists)
    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Library Password Reset OTP");
        msg.setText("Your OTP is: " + otp + "\nValid for 10 minutes.");
        mailSender.send(msg);
    }

    // 🔔 DUE DATE REMINDER
    public void sendDueDateReminder(
            String to,
            String userName,
            String bookTitle,
            String message
    ) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Library Book Due Reminder");
        msg.setText(
                "Hello " + userName + ",\n\n" +
                message + "\n\n" +
                "Book: " + bookTitle + "\n\n" +
                "Please return or renew on time.\n\n" +
                "— Library Management System"
        );
        mailSender.send(msg);
    }
}
