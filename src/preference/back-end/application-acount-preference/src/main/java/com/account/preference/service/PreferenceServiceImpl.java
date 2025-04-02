package com.account.preference.service;

import com.account.preference.dto.request.UpdatePreferenceRequest;
import com.account.preference.dto.response.PreferenceResponse;
import com.account.preference.mapper.PreferenceMapper;
import com.account.preference.model.PreferenceEntity;
import com.account.preference.repository.PreferenceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class PreferenceServiceImpl implements PreferenceService {

    @Inject
    PreferenceRepository preferenceRepository;

    @Override
    public PreferenceResponse findOrCreatePreferenceByAccountId(String accountId) {
        PreferenceEntity preference = preferenceRepository.findByAccountId(accountId)
                .orElseGet(() -> createPreferenceFromAccountId(accountId));

        return PreferenceMapper.toResponse(preference);  // Usando o Mapper
    }

    @Override
    public PreferenceResponse update(String accountId, UpdatePreferenceRequest request) {
        PreferenceEntity existing = preferenceRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Preference not found"));

        PreferenceMapper.updateEntity(existing, request);
        preferenceRepository.update(existing);
        return PreferenceMapper.toResponse(existing);  // Usando o Mapper para criar a resposta
    }

    private PreferenceEntity createPreferenceFromAccountId(String accountId) {
        PreferenceEntity preference = new PreferenceEntity(accountId);
        return preferenceRepository.save(preference);
    }
}
