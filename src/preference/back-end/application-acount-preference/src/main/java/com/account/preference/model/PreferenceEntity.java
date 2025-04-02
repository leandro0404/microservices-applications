package com.account.preference.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.time.Instant;
import java.util.UUID;

@DynamoDbBean
public class PreferenceEntity {
    private String id;
    private String helm;
    private String accountId;
    private String locale;
    private String timezone;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant lastAccessed;

    public PreferenceEntity() {
    }


    public PreferenceEntity(String accountId) {
        this.id = UUID.randomUUID().toString();
        this.accountId = accountId;
        this.helm = "DEFAULT";
        this.locale = "pt-br";
        this.timezone = "America/Sao_Paulo";
        this.createdAt = Instant.now();
        this.updatedAt = null;
        this.lastAccessed = null;
    }

    @DynamoDbPartitionKey
    @DynamoDbAttribute("id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbSortKey
    @DynamoDbAttribute("helm")
    public String getHelm() {
        return helm;
    }

    public void setHelm(String helm) {
        this.helm = helm;
    }

    @DynamoDbAttribute("accountId")
    @DynamoDbSecondaryPartitionKey(indexNames = {"account-index"})
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @DynamoDbAttribute("locale")
    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    @DynamoDbAttribute("timezone")
    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    @DynamoDbAttribute("createdAt")
    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @DynamoDbAttribute("updatedAt")
    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void update() {
        this.updatedAt = Instant.now();
    }

    @DynamoDbAttribute("lastAccessed")
    public Instant getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(Instant lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public void updateLastAccessed() {
        this.lastAccessed = Instant.now();
    }
}
