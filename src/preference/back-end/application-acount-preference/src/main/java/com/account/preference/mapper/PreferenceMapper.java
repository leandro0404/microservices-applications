package com.account.preference.mapper;

import com.account.preference.dto.request.UpdatePreferenceRequest;
import com.account.preference.dto.response.PreferenceResponse;
import com.account.preference.model.PreferenceEntity;

public class PreferenceMapper {

    public static PreferenceResponse toResponse(PreferenceEntity entity) {
        return new PreferenceResponse(
                entity.getId(),
                entity.getAccountId(),
                entity.getLocale(),
                entity.getTimezone(),
                entity.getCreatedAt().toString(),
                entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null
        );
    }

    public static void updateEntity(PreferenceEntity entity, UpdatePreferenceRequest request) {
        entity.setLocale(request.locale() != null ? request.locale() : entity.getLocale());
        entity.setTimezone(request.timezone() != null ? request.timezone() : entity.getTimezone());
    }
}
