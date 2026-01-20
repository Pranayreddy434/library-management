package com.library.scheduler;

import com.library.notification.EmailService;
import com.library.reservation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DueDateReminderScheduler {

    private final ReservationRepository reservationRepo;
    private final EmailService emailService;

    // 🔔 RUNS DAILY AT 9 AM
    @Scheduled(cron = "0 0 9 * * *")
    public void sendDueDateReminders() {

        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        // 1️⃣ Due Tomorrow
        List<Reservation> dueTomorrow =
                reservationRepo.findByStatusAndDueDate(
                        ReservationStatus.BORROWED,
                        tomorrow
                );

        for (Reservation r : dueTomorrow) {
            emailService.sendDueDateReminder(
                    r.getUser().getEmail(),
                    r.getUser().getName(),
                    r.getBook().getTitle(),
                    "Your borrowed book is due TOMORROW."
            );
        }

        // 2️⃣ Due Today
        List<Reservation> dueToday =
                reservationRepo.findByStatusAndDueDate(
                        ReservationStatus.BORROWED,
                        today
                );

        for (Reservation r : dueToday) {
            emailService.sendDueDateReminder(
                    r.getUser().getEmail(),
                    r.getUser().getName(),
                    r.getBook().getTitle(),
                    "Your borrowed book is DUE TODAY."
            );
        }

        // 3️⃣ Overdue
        List<Reservation> overdue =
                reservationRepo.findByStatusAndDueDateBefore(
                        ReservationStatus.BORROWED,
                        today
                );

        for (Reservation r : overdue) {
            emailService.sendDueDateReminder(
                    r.getUser().getEmail(),
                    r.getUser().getName(),
                    r.getBook().getTitle(),
                    "Your borrowed book is OVERDUE. Fine may apply."
            );
        }
    }
}
