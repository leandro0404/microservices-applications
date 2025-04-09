package com.account.person.filter.client;

import com.account.person.filter.dto.response.AccountResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.Path;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "account-service")
@Path("/account")
public interface AccountClient {

    @GET
    AccountResponse getAccount(@HeaderParam("Authorization") String authorizationHeader);
}
