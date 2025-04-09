package com.account.person.repository;

import com.account.person.model.PersonEntity;

import java.util.Optional;

public interface PersonRepository {

    Optional<PersonEntity> findById(String id);
    Optional<PersonEntity> findByAccountId(String accountId);
    PersonEntity save(PersonEntity person);
    PersonEntity update(PersonEntity person);
} 