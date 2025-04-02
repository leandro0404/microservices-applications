package com.account.preference.resource;

import com.account.preference.dto.request.UpdatePreferenceRequest;
import com.account.preference.dto.response.PreferenceResponse;
import com.account.preference.service.PreferenceService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/preference")
public class PreferenceResource extends BaseResource {

    @Inject
    private PreferenceService preferenceService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public PreferenceResponse findOrCreatePreferenceByToken() {
        return preferenceService.findOrCreatePreferenceByAccountId(getAccountContext().accountId());
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PreferenceResponse updatePreference(UpdatePreferenceRequest request) {
        return preferenceService.update(getAccountContext().accountId(), request);
    }
}
