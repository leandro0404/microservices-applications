package com.account.service;

import com.account.dto.response.AccountResponse;

public interface AccountService {

    AccountResponse findOrCreateAccountBySub(String sub);

}
