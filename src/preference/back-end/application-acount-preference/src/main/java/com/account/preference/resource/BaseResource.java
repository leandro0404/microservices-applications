package com.account.preference.resource;

import com.account.preference.context.AccountContext;
import com.account.preference.context.AccountContextProvider;
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
}
