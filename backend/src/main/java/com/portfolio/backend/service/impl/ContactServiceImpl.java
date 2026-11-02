package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.ContactRequestDto;
import com.portfolio.backend.dto.ContactResponseDto;
import com.portfolio.backend.entity.Contact;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.ContactRepository;
import com.portfolio.backend.service.ContactService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    @Transactional
    public ContactResponseDto saveContact(ContactRequestDto requestDto) {
        Contact contact = new Contact();
        contact.setFullName(requestDto.getFullName().trim());
        contact.setEmail(requestDto.getEmail().trim().toLowerCase());
        contact.setSubject(requestDto.getSubject().trim());
        contact.setMessage(requestDto.getMessage().trim());

        Contact savedContact = contactRepository.save(contact);
        return mapToDto(savedContact);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactResponseDto> getAllContacts() {
        return contactRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ContactResponseDto getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with ID: " + id));
        return mapToDto(contact);
    }

    private ContactResponseDto mapToDto(Contact contact) {
        return new ContactResponseDto(
                contact.getId(),
                contact.getFullName(),
                contact.getEmail(),
                contact.getSubject(),
                contact.getMessage(),
                contact.getCreatedAt()
        );
    }
}
