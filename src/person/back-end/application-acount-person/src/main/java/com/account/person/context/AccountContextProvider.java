package com.account.person.context;

import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class AccountContextProvider {

    private AccountContext accountContext;

    // Método para configurar o AccountContext
    public void setAccountContext(AccountContext accountContext) {
        this.accountContext = accountContext;
    }

    // Método para obter o AccountContext
    public AccountContext getAccountContext() {
        return accountContext;
    }
}
