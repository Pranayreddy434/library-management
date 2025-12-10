package com.library.book;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.config.JwtAuthFilter;
import com.library.config.JwtService;
import com.library.user.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
@AutoConfigureMockMvc(addFilters = false)   // disable security filters
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // business service
    @MockBean
    private BookService bookService;

    // 🔐 security beans mocked so context can start
    @MockBean
    private JwtAuthFilter jwtAuthFilter;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void list_ShouldReturnBooks() throws Exception {
        Book b1 = new Book();
        b1.setId(1L);
        b1.setTitle("Clean Code");
        b1.setAuthor("Robert C. Martin");
        b1.setIsbn("9780132350884");
        b1.setCategory("Software");
        b1.setTotalCopies(4);
        b1.setAvailableCopies(4);
        b1.setCreatedAt(Instant.now());

        Mockito.when(bookService.listByTitle(null)).thenReturn(List.of(b1));

        mockMvc.perform(get("/api/books")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Clean Code")))
                .andExpect(jsonPath("$[0].author", is("Robert C. Martin")));
    }

    @Test
    void get_ShouldReturnSingleBook() throws Exception {
        Book b1 = new Book();
        b1.setId(1L);
        b1.setTitle("Clean Code");
        b1.setAuthor("Robert C. Martin");
        b1.setIsbn("9780132350884");
        b1.setCategory("Software");
        b1.setTotalCopies(4);
        b1.setAvailableCopies(4);
        b1.setCreatedAt(Instant.now());

        Mockito.when(bookService.get(1L)).thenReturn(b1);

        mockMvc.perform(get("/api/books/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Clean Code")))
                .andExpect(jsonPath("$.isbn", is("9780132350884")));
    }
}
