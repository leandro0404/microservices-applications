package com.profile.service;

import com.profile.dto.request.CreateProfileRequest;
import com.profile.dto.request.UpdateProfileRequest;
import com.profile.dto.response.ProfileResponse;

import java.util.List;
import java.util.Optional;

public interface ProfileService {

    ProfileResponse create(String accountId, CreateProfileRequest request);

    ProfileResponse update(String id,UpdateProfileRequest request);

    Optional<ProfileResponse> find(String accountId, String helm);

    Optional<ProfileResponse> findById(String id);

    List<ProfileResponse> find(String accountId);

    void delete(String id);
}
