package com.profile.dto.request;

public record CreateProfileRequest(String helm, String name, String biography, AvatarRequest avatar) {

}
