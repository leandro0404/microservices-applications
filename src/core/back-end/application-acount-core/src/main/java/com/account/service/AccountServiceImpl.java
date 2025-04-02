package com.account.service;

import com.account.dto.response.AccountResponse;
import com.account.mapper.AccountMapper;
import com.account.model.AccountEntity;
import com.account.repository.AccountRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AccountServiceImpl implements AccountService {

    @Inject
    AccountRepository accountRepository;

    @Override
    public AccountResponse findOrCreateAccountBySub(String sub) {
        AccountEntity existingAccount = accountRepository.findBySub(sub).orElse(null);

        if (existingAccount != null) {
            return AccountMapper.toResponse(existingAccount);
        } else {

            AccountEntity newAccount = createAccountFromSub(sub);
            return AccountMapper.toResponse(newAccount);
        }
    }

    private AccountEntity createAccountFromSub(String sub) {
        AccountEntity account = new AccountEntity(sub);
        return accountRepository.save(account);
    }
}
