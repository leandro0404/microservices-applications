package com.account.resource;



import com.account.dto.response.AccountResponse;
import com.account.service.AccountService;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


@Path("/account")
@Consumes(MediaType.APPLICATION_JSON)

public class AccountResource {

    @Inject
    private AccountService accountService;

    @Inject
    SecurityIdentity securityIdentity;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public AccountResponse findOrCreateAccountByToken() {
        String sub = securityIdentity.getPrincipal().getName();
        return accountService.findOrCreateAccountBySub(sub);
    }
}
