package com.account.person.mapper;

import com.account.person.dto.request.UpdatePersonRequest;
import com.account.person.dto.response.PersonResponse;
import com.account.person.model.PersonEntity;

import java.util.ArrayList;
import java.util.List;

public class PersonMapper {

    public static PersonResponse toResponse(PersonEntity entity) {
        List<PersonResponse.Document> documents = new ArrayList<>();
        if (entity.getDocuments() != null) {
            for (PersonEntity.Document doc : entity.getDocuments()) {
                documents.add(new PersonResponse.Document(
                    doc.getId(),
                    doc.getType(),
                    doc.getValue()
                ));
            }
        }

        List<PersonResponse.Phone> phones = new ArrayList<>();
        if (entity.getPhones() != null) {
            for (PersonEntity.Phone phone : entity.getPhones()) {
                phones.add(new PersonResponse.Phone(
                    phone.getId(),
                    phone.getType(),
                    phone.getValue()
                ));
            }
        }

        PersonResponse.Address address = null;
        if (entity.getAddress() != null) {
            address = new PersonResponse.Address(
                entity.getAddress().getStreet(),
                entity.getAddress().getNumber(),
                entity.getAddress().getComplement(),
                entity.getAddress().getNeighborhood(),
                entity.getAddress().getCity(),
                entity.getAddress().getState(),
                entity.getAddress().getZipCode()
            );
        }

        return new PersonResponse(
            entity.getId(),
            entity.getAccountId(),
            entity.getStatus(),
            entity.getType(),
            entity.getName(),
            entity.getBirthDate(),
            entity.getCompanyName(),
            entity.isMEI(),
            documents,
            address,
            phones,
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }

    public static void updateEntity(PersonEntity entity, UpdatePersonRequest request) {
        if (request.status() != null) {
            entity.setStatus(request.status());
        }
        if (request.type() != null) {
            entity.setType(request.type());
        }
        if (request.name() != null) {
            entity.setName(request.name());
        }
        if (request.birthDate() != null) {
            entity.setBirthDate(request.birthDate());
        }
        if (request.companyName() != null) {
            entity.setCompanyName(request.companyName());
        }
        entity.setMEI(request.isMEI());

        if (request.documents() != null) {
            List<PersonEntity.Document> documents = new ArrayList<>();
            for (UpdatePersonRequest.Document doc : request.documents()) {
                documents.add(new PersonEntity.Document(
                    doc.id(),
                    doc.type(),
                    doc.value()
                ));
            }
            entity.setDocuments(documents);
        }

        if (request.phones() != null) {
            List<PersonEntity.Phone> phones = new ArrayList<>();
            for (UpdatePersonRequest.Phone phone : request.phones()) {
                phones.add(new PersonEntity.Phone(
                    phone.id(),
                    phone.type(),
                    phone.value()
                ));
            }
            entity.setPhones(phones);
        }

        if (request.address() != null) {
            entity.setAddress(new PersonEntity.Address(
                request.address().street(),
                request.address().number(),
                request.address().complement(),
                request.address().neighborhood(),
                request.address().city(),
                request.address().state(),
                request.address().zipCode()
            ));
        }

        entity.update();
    }
} 