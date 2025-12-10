package com.library.admin;

import com.library.reservation.Reservation;
import com.library.reservation.ReservationRepository;
import com.library.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminReservationController {

    private final ReservationRepository reservationRepository;
    private final ReservationService reservationService;
    private final AdminService adminService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminReservationDto> listAll() {
        return reservationRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/return")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminReservationDto returnBook(@PathVariable Long id) {
        Reservation r = reservationService.returnBook(id);
        adminService.log("ADMIN_RETURNED_BOOK", "RESERVATION", r.getId(),
                "Marked as returned by admin");
        return toDto(r);
    }

    private AdminReservationDto toDto(Reservation r) {
        AdminReservationDto dto = new AdminReservationDto();
        dto.setId(r.getId());
        dto.setStatus(r.getStatus().name());
        dto.setIssueDate(r.getIssueDate());
        dto.setDueDate(r.getDueDate());
        dto.setReturnDate(r.getReturnDate());
        dto.setFineAmount(r.getFineAmount());

        AdminReservationDto.UserSummary us = new AdminReservationDto.UserSummary();
        us.setId(r.getUser().getId());
        us.setName(r.getUser().getName());
        us.setEmail(r.getUser().getEmail());
        dto.setUser(us);

        AdminReservationDto.BookSummary bs = new AdminReservationDto.BookSummary();
        bs.setId(r.getBook().getId());
        bs.setTitle(r.getBook().getTitle());
        bs.setAuthor(r.getBook().getAuthor());
        bs.setIsbn(r.getBook().getIsbn());
        dto.setBook(bs);

        return dto;
    }
}
