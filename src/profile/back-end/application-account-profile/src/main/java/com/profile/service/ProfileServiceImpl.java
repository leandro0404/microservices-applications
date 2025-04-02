package com.profile.service;

import com.profile.dto.request.CreateProfileRequest;
import com.profile.dto.request.UpdateProfileRequest;
import com.profile.dto.response.ProfileResponse;
import com.profile.mapper.ProfileMapper;
import com.profile.model.ProfileEntity;
import com.profile.repository.ProfileRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProfileServiceImpl implements ProfileService {

    @Inject
    ProfileRepository profileRepository;

    @Override
    public ProfileResponse create(String accountId, CreateProfileRequest request) {
        ProfileEntity profileEntity = ProfileMapper.toEntity(accountId, request);
        profileRepository.save(profileEntity);
        return ProfileMapper.toResponse(profileEntity);
    }

    @Override
    public ProfileResponse update(String id, UpdateProfileRequest request) {
        ProfileEntity existingProfile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        ProfileMapper.updateEntity(existingProfile, request); // Update only the modified fields
        profileRepository.update(existingProfile);

        return ProfileMapper.toResponse(existingProfile);
    }

    @Override
    public Optional<ProfileResponse> find(String accountId, String helm) {
        return profileRepository.find(accountId, helm)
                .map(ProfileMapper::toResponse);
    }

    @Override
    public Optional<ProfileResponse> findById(String id) {
        return profileRepository.findById(id)
                .map(ProfileMapper::toResponse);
    }

    @Override
    public List<ProfileResponse> find(String accountId) {
        return profileRepository.find(accountId).stream()
                .map(ProfileMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String id) {
        ProfileEntity existingProfile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        profileRepository.delete(existingProfile);
    }
}
