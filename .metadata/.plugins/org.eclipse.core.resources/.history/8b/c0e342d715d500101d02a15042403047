package com.library.book;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpenLibraryService {

    private final RestTemplate restTemplate;

    @Value("${openlibrary.base-url:https://openlibrary.org}")
    private String baseUrl;

    public OpenLibrarySearchResponse search(String query) {
        String encoded = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = baseUrl + "/search.json?q=" + encoded;
        return restTemplate.getForObject(url, OpenLibrarySearchResponse.class);
    }

    @Data
    public static class OpenLibrarySearchResponse {
        private List<Doc> docs;

        @Data
        public static class Doc {
            private String title;
            private List<String> author_name;
            private List<String> isbn;
            private List<String> subject;
            private Integer first_publish_year;
            private String key; // e.g. "/works/OL12345W"
        }
    }
}
