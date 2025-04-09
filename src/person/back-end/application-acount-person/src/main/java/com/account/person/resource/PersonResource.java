package com.account.person.resource;

import com.account.person.dto.request.UpdatePersonRequest;
import com.account.person.dto.response.PersonResponse;
import com.account.person.service.PersonService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/person")
public class PersonResource extends BaseResource {

    @Inject
    private PersonService personService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public PersonResponse createOrFind() {
        String accountId = getAccountContext().accountId();
        return personService.findByAccountId(accountId)
                .orElseGet(() -> personService.create(accountId));
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PersonResponse update(UpdatePersonRequest request) {
        String accountId = getAccountContext().accountId();
        return personService.findByAccountId(accountId)
                .map(person -> personService.update(person.id(), request)
                        .orElseThrow(() -> new NotFoundException("Person not found")))
                .orElseThrow(() -> new NotFoundException("Person not found"));
    }
} 