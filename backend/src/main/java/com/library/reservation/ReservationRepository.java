package com.library.reservation;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.book.Book;
import com.library.user.User;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    long countByUserAndStatusIn(User user, List<ReservationStatus> statuses);

    List<Reservation> findByBookAndStatusInOrderByCreatedAtAsc(
            Book book,
            List<ReservationStatus> statuses
    );

    List<Reservation> findByStatusAndExpiresAtBefore(
            ReservationStatus status,
            Instant before
    );

   
    List<Reservation> findByUserOrderByCreatedAtDesc(User user);
    List<Reservation> findByStatusAndDueDate(
            ReservationStatus status,
            LocalDate dueDate
    );

    List<Reservation> findByStatusAndDueDateBefore(
            ReservationStatus status,
            LocalDate date
    );
}
