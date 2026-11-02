package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.ContactRequestDto;
import com.portfolio.backend.dto.ContactResponseDto;
import com.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * Public Endpoint: Submit Contact Form
     * Accessible by anyone from the portfolio frontend
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ContactResponseDto>> submitContact(
            @Valid @RequestBody ContactRequestDto requestDto) {
        ContactResponseDto savedContact = contactService.saveContact(requestDto);
        ApiResponse<ContactResponseDto> response = ApiResponse.success(
                "Your inquiry has been successfully received. We will get back to you shortly!",
                savedContact
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Admin Endpoint: View all submitted contact inquiries
     * Protected by Spring Security (Requires ADMIN role / Basic Auth)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactResponseDto>>> getAllContacts() {
        List<ContactResponseDto> contacts = contactService.getAllContacts();
        ApiResponse<List<ContactResponseDto>> response = ApiResponse.success(
                "Successfully retrieved " + contacts.size() + " contact inquiry records.",
                contacts
        );
        return ResponseEntity.ok(response);
    }

    /**
     * Admin Endpoint: View single contact by ID
     * Protected by Spring Security
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ContactResponseDto>> getContactById(@PathVariable Long id) {
        ContactResponseDto contact = contactService.getContactById(id);
        ApiResponse<ContactResponseDto> response = ApiResponse.success(
                "Successfully retrieved contact inquiry record.",
                contact
        );
        return ResponseEntity.ok(response);
    }
}
