package com.profile.mapper;

import com.profile.dto.request.CreateProfileRequest;
import com.profile.dto.request.UpdateProfileRequest;
import com.profile.dto.response.AvatarResponse;
import com.profile.dto.response.ProfileResponse;
import com.profile.model.ProfileEntity;

import java.util.UUID;

public class ProfileMapper {

    public static ProfileEntity toEntity(String accountId, CreateProfileRequest request) {
        return new ProfileEntity(
                UUID.randomUUID().toString(),
                accountId,
                request.helm() != null ? request.helm() : "DEFAULT",
                request.name(),
                request.biography(),
                request.avatar() != null ? request.avatar().url() : null
        );
    }


    public static void updateEntity(ProfileEntity entity, UpdateProfileRequest request) {
        entity.setName(request.name() != null ? request.name() : entity.getName());
        entity.setBiography(request.biography() != null ? request.biography() : entity.getBiography());
        if (request.avatar() != null && request.avatar().url() != null) {
            entity.setAvatarUrl(request.avatar().url());
        }
        entity.update();
    }


    public static ProfileResponse toResponse(ProfileEntity entity) {
        return new ProfileResponse(
                entity.getId(),
                entity.getAccountId(),  // Aqui o accountId já é mapeado
                entity.getHelm(), // Helm continua sendo a sort key
                entity.getName(),
                entity.getBiography(),
                new AvatarResponse(entity.getAvatarUrl())
        );
    }
}
