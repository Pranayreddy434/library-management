package com.library.book;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository repo;

    // For /api/books – user side
    public List<Book> listAll() {
        return repo.findAll(Sort.by("title").ascending());
    }

    // For future filtering if needed
    public List<Book> listByTitle(String title) {
        if (title == null || title.isBlank()) {
            return listAll();
        }
        // simple contains ignore case search (if you create such method),
        // otherwise just return listAll() for now
        return listAll();
    }

    public Book get(Long id) {
        return repo.findById(id).orElseThrow();
    }

    // Used by admin create/import
    public Book save(Book book) {
        return repo.save(book);
    }
}
