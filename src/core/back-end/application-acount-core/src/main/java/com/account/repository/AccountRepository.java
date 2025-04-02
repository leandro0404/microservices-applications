package com.account.repository;

import com.account.model.AccountEntity;

import java.util.List;
import java.util.Optional;

public interface AccountRepository {

    Optional<AccountEntity> findById(String id);
    Optional<AccountEntity> findBySub(String sub);
    AccountEntity save(AccountEntity account);
    AccountEntity update(AccountEntity account);

}
