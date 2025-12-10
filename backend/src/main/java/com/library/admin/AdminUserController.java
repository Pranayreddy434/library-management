package com.library.admin;

import com.library.reservation.Reservation;
import com.library.reservation.ReservationRepository;
import com.library.user.User;
import com.library.user.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminUserDto> listUsers() {
        return userRepository.findAll().stream()
                .map(u -> {
                    AdminUserDto dto = new AdminUserDto();
                    dto.setId(u.getId());
                    dto.setName(u.getName());
                    dto.setEmail(u.getEmail());
                    dto.setRole(u.getRole().name());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}/reservations")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminReservationDto> userReservations(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        List<Reservation> list = reservationRepository.findByUserOrderByCreatedAtDesc(user);
        return list.stream().map(this::toDto).collect(Collectors.toList());
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

    @Data
    public static class AdminUserDto {
        private Long id;
        private String name;
        private String email;
        private String role;
    }
}
