package com.account.preference.repository;

import com.account.preference.model.PreferenceEntity;

import java.util.Optional;

public interface PreferenceRepository {

    Optional<PreferenceEntity> findById(String id);
    Optional<PreferenceEntity> findByAccountId(String accountId);
    PreferenceEntity save(PreferenceEntity account);
    PreferenceEntity update(PreferenceEntity account);

}
