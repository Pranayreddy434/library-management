-- ==========================================================
-- LIBRARY SETTINGS
-- ==========================================================
INSERT INTO library_settings (id, max_borrow_days, reservation_limit_per_user, fine_per_day)
VALUES (1, 14, 5, 2.00)
ON DUPLICATE KEY UPDATE max_borrow_days = 14;


-- ==========================================================
-- USERS (Admin + sample user)
-- Passwords: admin123 / user123 (BCrypt hashes)
-- ==========================================================
INSERT INTO users (id, name, email, password, role)
VALUES 
  (1, 'Admin', 'admin@library.com', 
   '$2a$10$fJVYtz8HzX3z9bYQ6zR0ROoF9uXpzqkJ6Z3b49y3PhxfHS5YUOFWy', 'ADMIN'),
  (2, 'John Doe', 'john@example.com', 
   '$2a$10$RaC21KI6yCv6lb6qTntpfeESB.68lRoqA8g.QnDlqLkQ/eBFm2I2S', 'USER')
ON DUPLICATE KEY UPDATE name = VALUES(name);


-- Password Notes:
-- admin123 = $2a$10$fJVYtz8HzX3z9bYQ6zR0ROoF9uXpzqkJ6Z3b49y3PhxfHS5YUOFWy
-- user123  = $2a$10$RaC21KI6yCv6lb6qTntpfeESB.68lRoqA8g.QnDlqLkQ/eBFm2I2S


-- ==========================================================
-- BOOKS — seeded with covers from OpenLibrary
-- ==========================================================
INSERT INTO book (id, title, author, isbn, category, total_copies, available_copies, cover_image_url, description, created_at)
VALUES
  (1, 'Clean Code', 'Robert C. Martin', '9780132350884', 'Software', 4, 4,
   'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg',
   'A handbook on writing clean, maintainable code.', CURRENT_TIMESTAMP),

  (2, 'The Pragmatic Programmer', 'Andrew Hunt; David Thomas', '9780201616224', 'Software', 3, 3,
   'https://covers.openlibrary.org/b/isbn/9780201616224-M.jpg',
   'Practical tips for becoming a better programmer.', CURRENT_TIMESTAMP),

  (3, 'Design Patterns', 'Erich Gamma; Richard Helm; Ralph Johnson; John Vlissides', '9780201633610', 'Software', 2, 2,
   'https://covers.openlibrary.org/b/isbn/9780201633610-M.jpg',
   'Classic catalog of reusable object-oriented design patterns.', CURRENT_TIMESTAMP),

  (4, 'Zero to One', 'Peter Thiel', '9780804139298', 'Business', 5, 5,
   'https://covers.openlibrary.org/b/isbn/9780804139298-M.jpg',
   'Thoughts on building breakthrough startups and companies.', CURRENT_TIMESTAMP),

  (5, 'Refactoring', 'Martin Fowler', '9780201485677', 'Software', 3, 3,
   'https://covers.openlibrary.org/b/isbn/9780201485677-M.jpg',
   'Improving the design of existing code step by step.', CURRENT_TIMESTAMP),

  (6, 'Clean Architecture', 'Robert C. Martin', '9780134494166', 'Software', 3, 3,
   'https://covers.openlibrary.org/b/isbn/9780134494166-M.jpg',
   'A guide to building robust, flexible software architectures.', CURRENT_TIMESTAMP),

  (7, 'Head First Design Patterns', 'Eric Freeman; Elisabeth Robson', '9780596007126', 'Software', 4, 4,
   'https://covers.openlibrary.org/b/isbn/9780596007126-M.jpg',
   'Visual, example-driven introduction to design patterns.', CURRENT_TIMESTAMP),

  (8, 'Introduction to Algorithms', 'Thomas H. Cormen; Charles E. Leiserson; Ronald L. Rivest; Clifford Stein', '9780262033848', 'Algorithms', 2, 2,
   'https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg',
   'Comprehensive reference on algorithms and data structures.', CURRENT_TIMESTAMP),

  (9, 'Cracking the Coding Interview', 'Gayle Laakmann McDowell', '9780984782857', 'Interview', 5, 5,
   'https://covers.openlibrary.org/b/isbn/9780984782857-M.jpg',
   'Interview preparation book with coding questions and solutions.', CURRENT_TIMESTAMP),

  (10, 'Algorithms', 'Robert Sedgewick; Kevin Wayne', '9780321573513', 'Algorithms', 3, 3,
   'https://covers.openlibrary.org/b/isbn/9780321573513-M.jpg',
   'Practical introduction to algorithms in Java.', CURRENT_TIMESTAMP),

  (11, 'The Mythical Man-Month', 'Frederick P. Brooks Jr.', '9780201835953', 'Software Engineering', 2, 2,
   'https://covers.openlibrary.org/b/isbn/9780201835953-M.jpg',
   'Essays on software engineering and project management.', CURRENT_TIMESTAMP),

  (12, 'Working Effectively with Legacy Code', 'Michael Feathers', '9780131177055', 'Software', 2, 2,
   'https://covers.openlibrary.org/b/isbn/9780131177055-M.jpg',
   'Techniques for safely changing existing, legacy systems.', CURRENT_TIMESTAMP),

  (13, 'You Don’t Know JS: Scope & Closures', 'Kyle Simpson', '9781449335588', 'JavaScript', 4, 4,
   'https://covers.openlibrary.org/b/isbn/9781449335588-M.jpg',
   'Deep dive into JavaScript scope and closures.', CURRENT_TIMESTAMP),

  (14, 'Eloquent JavaScript', 'Marijn Haverbeke', '9781593279509', 'JavaScript', 4, 4,
   'https://covers.openlibrary.org/b/isbn/9781593279509-M.jpg',
   'Modern introduction to programming with JavaScript.', CURRENT_TIMESTAMP),

  (15, 'JavaScript: The Good Parts', 'Douglas Crockford', '9780596517748', 'JavaScript', 3, 3,
   'https://covers.openlibrary.org/b/isbn/9780596517748-M.jpg',
   'Highlights the most reliable features of JavaScript.', CURRENT_TIMESTAMP),

  (16, 'Deep Learning', 'Ian Goodfellow; Yoshua Bengio; Aaron Courville', '9780262035613', 'AI / ML', 2, 2,
   'https://covers.openlibrary.org/b/isbn/9780262035613-M.jpg',
   'Foundational text on deep learning concepts and methods.', CURRENT_TIMESTAMP),

  (17, 'Pattern Recognition and Machine Learning', 'Christopher M. Bishop', '9780387310732', 'AI / ML', 2, 2,
   'https://covers.openlibrary.org/b/isbn/9780387310732-M.jpg',
   'Comprehensive introduction to pattern recognition and ML.', CURRENT_TIMESTAMP),

  (18, 'The Lean Startup', 'Eric Ries', '9780307887894', 'Business', 4, 4,
   'https://covers.openlibrary.org/b/isbn/9780307887894-M.jpg',
   'Build products efficiently using validated learning.', CURRENT_TIMESTAMP),

  (19, 'Atomic Habits', 'James Clear', '9780735211292', 'Self Help', 5, 5,
   'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg',
   'Practical guide for building good habits and breaking bad ones.', CURRENT_TIMESTAMP),

  (20, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '9780062316097', 'History', 3, 3,
   'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg',
   'Explores the history and impact of Homo sapiens.', CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE title = VALUES(title), author = VALUES(author);


-- ==========================================================
-- SAMPLE RESERVATIONS (Optional)
-- Uncomment if needed for admin dashboard testing
-- ==========================================================
-- INSERT INTO reservation (id, user_id, book_id, created_at, issue_date, due_date, status, fine_amount)
-- VALUES
--   (1, 2, 1, NOW(), CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'BORROWED', 0.00)
-- ON DUPLICATE KEY UPDATE status = 'BORROWED';
