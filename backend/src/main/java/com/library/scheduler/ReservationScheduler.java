package com.library.scheduler;

import com.library.notification.NotificationService;
import com.library.reservation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReservationScheduler {

    private final ReservationRepository reservationRepo;
    private final NotificationService notificationService;

    @Scheduled(cron = "0 0 * * * *") // every hour
    public void cancelExpiredReservations() {
        List<Reservation> expired = reservationRepo.findByStatusAndExpiresAtBefore(
                ReservationStatus.REQUESTED,
                Instant.now()
        );
        for (Reservation r : expired) {
            r.setStatus(ReservationStatus.CANCELLED);
            r.setCancelledAt(Instant.now());
            reservationRepo.save(r);

            notificationService.notify(
                    r.getUser(),
                    "Reservation expired: " + r.getBook().getTitle(),
                    "Your reservation request has expired.",
                    "EXPIRED"
            );
        }
    }
}
