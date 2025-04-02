package com.account.mapper;

import com.account.dto.response.AccountResponse;
import com.account.model.AccountEntity;

public class AccountMapper {

    public static AccountResponse toResponse(AccountEntity entity) {
        return new AccountResponse(
                entity.getId(),
                entity.getSub(),
                entity.getCreatedAt().toString(),
                entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null
        );
    }
}
