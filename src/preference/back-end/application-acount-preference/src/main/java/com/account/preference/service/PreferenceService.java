package com.account.preference.service;

import com.account.preference.dto.request.UpdatePreferenceRequest;
import com.account.preference.dto.response.PreferenceResponse;

public interface PreferenceService {

    PreferenceResponse findOrCreatePreferenceByAccountId(String accountId);

    PreferenceResponse update(String accountId, UpdatePreferenceRequest request);
}
