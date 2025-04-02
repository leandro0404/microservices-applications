package com.profile.resource;

import com.profile.dto.request.CreateProfileRequest;
import com.profile.dto.request.UpdateProfileRequest;
import com.profile.dto.response.ProfileResponse;
import com.profile.service.ProfileService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

import java.util.List;

@Path("/account")
public class ProfileResource extends  BaseResource {

    @Inject
    ProfileService profileService;

    @GET
    @Path("{accountId}/profile/{helm}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Retrieve a profile", description = "Retrieve a profile by accountId and Helm")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @APIResponse(responseCode = "404", description = "Profile not found")
    })

    public ProfileResponse retrieve(@PathParam("accountId") String accountId, @PathParam("helm") String helm) {
        return profileService.find(accountId, helm).orElse(null);
    }

    @GET
    @Path("{accountId}/profiles")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "List profiles by accountId", description = "List profiles by accountId")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Profiles retrieved successfully"),
            @APIResponse(responseCode = "404", description = "Profiles not found")
    })

    public List<ProfileResponse> listByAccountId(@PathParam("accountId") String accountId) {
        return profileService.find(accountId);
    }

    // Endpoint para buscar perfil por ID, sem a necessidade de accountId ou helm
    @GET
    @Path("profile/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Retrieve a profile by ID", description = "Retrieve a profile directly by its ID")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @APIResponse(responseCode = "404", description = "Profile not found")
    })

    public ProfileResponse retrieveById(@PathParam("id") String id) {
        return profileService.findById(id).orElse(null);
    }

    @GET
    @Path("profile/{id}/avatar")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Retrieve profile avatar", description = "Retrieve the avatar URL by profile ID")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Avatar URL retrieved successfully"),
            @APIResponse(responseCode = "404", description = "Profile not found or avatar not set")
    })

    public String getAvatarUrl(@PathParam("id") String id) {
        ProfileResponse profile = profileService.findById(id).orElseThrow(() -> new RuntimeException("Profile not found"));
        return profile.avatar().url(); // Assume 'getAvatar()' returns an Avatar object with 'getUrl()'
    }

    @POST
    @Path("{accountId}/profile")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Create a new profile", description = "Create a new profile")
    @APIResponses(value = {
            @APIResponse(responseCode = "201", description = "Profile created successfully"),
            @APIResponse(responseCode = "400", description = "Invalid request data")
    })
    public ProfileResponse create(@PathParam("accountId") String accountId, CreateProfileRequest request) {
        validateAccountId(accountId);
        return profileService.create(accountId, request);
    }

    @PUT
    @Path("profile/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Update an existing profile", description = "Update an existing profile")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Profile updated successfully"),
            @APIResponse(responseCode = "400", description = "Invalid request data"),
            @APIResponse(responseCode = "404", description = "Profile not found")
    })
    public ProfileResponse update(@PathParam("id") String id, UpdateProfileRequest request) {
        findAndValidateProfile(id);
        return profileService.update(id, request);
    }

    @DELETE
    @Path("profile/{id}")
    @Operation(summary = "Delete a profile", description = "Delete a profile by ID")
    @APIResponses(value = {
            @APIResponse(responseCode = "204", description = "Profile deleted successfully"),
            @APIResponse(responseCode = "404", description = "Profile not found")
    })
    public void delete(@PathParam("id") String id) {
        findAndValidateProfile(id);
        profileService.delete(id);
    }

    private void findAndValidateProfile(String id) {
        var profile = profileService.find(getAccountContext().accountId()).stream()
                .filter(x -> x.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new WebApplicationException("Profile not found", Response.Status.NOT_FOUND));

        validateAccountId(profile.accountId());
    }

}