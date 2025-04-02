package com.account.preference.dto.response;

public record PreferenceResponse(String id, String accountId, String locale, String timezone, String createdAt,
                                 String updatedAt) {
}
