package com.account.person.service;

import com.account.person.dto.request.UpdatePersonRequest;
import com.account.person.dto.response.PersonResponse;

import java.util.Optional;

public interface PersonService {
    Optional<PersonResponse> findById(String id);
    Optional<PersonResponse> findByAccountId(String accountId);
    PersonResponse create(String accountId);
    Optional<PersonResponse> update(String id, UpdatePersonRequest request);
} 