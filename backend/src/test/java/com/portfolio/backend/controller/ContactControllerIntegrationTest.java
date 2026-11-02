package com.portfolio.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.ContactRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class ContactControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/contacts should successfully save contact and return 201 Created")
    void testSubmitContact_Success() throws Exception {
        ContactRequestDto request = new ContactRequestDto(
                "Elon Musk",
                "elon@tesla.com",
                "Distributed Systems Inquiry",
                "Hello Alex, we are looking for a Senior Engineer with high performance Spring Boot and React background."
        );

        mockMvc.perform(post("/api/contacts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.fullName", is("Elon Musk")))
                .andExpect(jsonPath("$.data.email", is("elon@tesla.com")))
                .andExpect(jsonPath("$.data.subject", is("Distributed Systems Inquiry")))
                .andExpect(jsonPath("$.data.id", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/contacts with invalid payload should return 400 Bad Request with validation errors")
    void testSubmitContact_ValidationFailure() throws Exception {
        ContactRequestDto request = new ContactRequestDto(
                "", // empty name
                "invalid-email-address", // bad email
                "Hi", // too short subject
                "Short" // too short message
        );

        mockMvc.perform(post("/api/contacts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.data.fullName", notNullValue()))
                .andExpect(jsonPath("$.data.email", notNullValue()))
                .andExpect(jsonPath("$.data.subject", notNullValue()))
                .andExpect(jsonPath("$.data.message", notNullValue()));
    }

    @Test
    @DisplayName("GET /api/contacts without authentication should return 401 Unauthorized")
    void testGetContacts_Unauthorized() throws Exception {
        mockMvc.perform(get("/api/contacts"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/contacts with valid admin credentials should return 200 OK")
    void testGetContacts_AuthorizedWithAdmin() throws Exception {
        mockMvc.perform(get("/api/contacts")
                        .with(httpBasic("admin", "admin123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", notNullValue()));
    }
}
