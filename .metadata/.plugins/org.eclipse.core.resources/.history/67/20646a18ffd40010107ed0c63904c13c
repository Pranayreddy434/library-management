package com.library.admin;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AdminReservationDto {
    private Long id;
    private String status;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BigDecimal fineAmount;
    private UserSummary user;
    private BookSummary book;

    @Data
    public static class UserSummary {
        private Long id;
        private String name;
        private String email;
    }

    @Data
    public static class BookSummary {
        private Long id;
        private String title;
        private String author;
        private String isbn;
    }
}
