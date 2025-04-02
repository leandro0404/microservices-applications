package com.profile.filter;


import com.profile.context.AccountContext;
import com.profile.context.AccountContextProvider;
import com.profile.filter.client.AccountClient;
import com.profile.filter.dto.response.AccountResponse;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Provider
@RequestScoped
public class AuthorizationFilter implements ContainerRequestFilter {

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    @RestClient
    AccountClient accountClient;

    @Inject
    AccountContextProvider accountContextProvider;  // Injeção do AccountContextProvider

    @Override
    public void filter(ContainerRequestContext requestContext) {
        // Obtém o token do cabeçalho Authorization
        String authorizationHeader = requestContext.getHeaderString("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {


            // Chama a API para buscar informações da conta
            String token = authorizationHeader.substring("Bearer ".length());
            AccountResponse accountResponse = accountClient.getAccount("Bearer " + token);

            if (accountResponse == null) {
                throw new WebApplicationException("Account not found or mismatched sub", Response.Status.FORBIDDEN);
            }

            // Cria o AccountContext e define no AccountContextProvider
            AccountContext accountContext = new AccountContext(accountResponse.id());
            accountContextProvider.setAccountContext(accountContext);  // Armazena no provider
        }
    }
}