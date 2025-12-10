package com.library.reservation;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ReservationDto {
    private Long id;
    private String status;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BigDecimal fineAmount;

    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
}
