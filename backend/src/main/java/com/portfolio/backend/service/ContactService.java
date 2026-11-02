package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequestDto;
import com.portfolio.backend.dto.ContactResponseDto;

import java.util.List;

public interface ContactService {

    ContactResponseDto saveContact(ContactRequestDto requestDto);

    List<ContactResponseDto> getAllContacts();

    ContactResponseDto getContactById(Long id);
}
