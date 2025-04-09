package com.account.person.service.impl;

import com.account.person.dto.request.UpdatePersonRequest;
import com.account.person.dto.response.PersonResponse;
import com.account.person.mapper.PersonMapper;
import com.account.person.model.PersonEntity;
import com.account.person.repository.PersonRepository;
import com.account.person.service.PersonService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    @Inject
    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public Optional<PersonResponse> findById(String id) {
        return personRepository.findById(id)
                .map(PersonMapper::toResponse);
    }

    @Override
    public Optional<PersonResponse> findByAccountId(String accountId) {
        return personRepository.findByAccountId(accountId)
                .map(PersonMapper::toResponse);
    }

    @Override
    @Transactional
    public PersonResponse create(String accountId) {
        PersonEntity person = new PersonEntity(accountId);
        person = personRepository.save(person);
        return PersonMapper.toResponse(person);
    }

    @Override
    @Transactional
    public Optional<PersonResponse> update(String id, UpdatePersonRequest request) {
        return personRepository.findById(id)
                .map(person -> {
                    PersonMapper.updateEntity(person, request);
                    person = personRepository.update(person);
                    return PersonMapper.toResponse(person);
                });
    }
} 