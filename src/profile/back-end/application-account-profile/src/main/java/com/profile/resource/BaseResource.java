package com.profile.resource;


import com.profile.context.AccountContext;
import com.profile.context.AccountContextProvider;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

public abstract class BaseResource {

    @Inject
    private AccountContextProvider accountContextProvider;

    protected AccountContext getAccountContext() {
        AccountContext accountContext = accountContextProvider.getAccountContext();
        if (accountContext == null) {
            throw new WebApplicationException("Account context not found", Response.Status.UNAUTHORIZED);
        }
        return accountContext;
    }

    protected void validateAccountId(String accountId) {
        String contextAccountId = getAccountContext().accountId();

        if (!accountId.equals(contextAccountId)) {
            throw new WebApplicationException("Forbidden: Account ID does not match", Response.Status.FORBIDDEN);
        }
    }
}
