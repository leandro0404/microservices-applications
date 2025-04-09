package com.account.person.dto.response;

import com.account.person.model.enums.DocumentType;
import com.account.person.model.enums.PersonType;
import com.account.person.model.enums.PhoneType;
import com.account.person.model.enums.StatusType;

import java.time.Instant;
import java.util.List;

public record PersonResponse(
    String id,
    String accountId,
    StatusType status,
    PersonType type,
    String name,
    Instant birthDate,
    String companyName,
    boolean isMEI,
    List<Document> documents,
    Address address,
    List<Phone> phones,
    Instant createdAt,
    Instant updatedAt
) {
    public record Document(
        String id,
        DocumentType type,
        String value
    ) {}

    public record Phone(
        String id,
        PhoneType type,
        String value
    ) {}

    public record Address(
        String street,
        String number,
        String complement,
        String neighborhood,
        String city,
        String state,
        String zipCode
    ) {}
} 