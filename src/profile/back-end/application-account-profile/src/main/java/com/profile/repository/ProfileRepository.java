package com.profile.repository;

import com.profile.model.ProfileEntity;
import java.util.List;
import java.util.Optional;

public interface ProfileRepository {

    Optional<ProfileEntity> find(String accountId, String helm);
    Optional<ProfileEntity> findById(String id);
    List<ProfileEntity> find(String accountId);
    void save(ProfileEntity profile);
    void update(ProfileEntity profile);
    void delete(ProfileEntity profile);
}
