package com.account.preference.repository;

import com.account.preference.model.PreferenceEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.Optional;

@ApplicationScoped
public class PreferenceRepositoryImpl implements PreferenceRepository {

    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;
    private static final String TABLE_NAME = "application-preference";

    @Inject
    public PreferenceRepositoryImpl(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
    }

    private DynamoDbTable<PreferenceEntity> getTable() {
        return dynamoDbEnhancedClient.table(TABLE_NAME, TableSchema.fromBean(PreferenceEntity.class));
    }

    @Override
    public Optional<PreferenceEntity> findById(String id) {
        PreferenceEntity account = getTable().getItem(r -> r.key(k ->
                k.partitionValue(id)
        ));
        return Optional.ofNullable(account);
    }

    @Override
    public Optional<PreferenceEntity> findByAccountId(String accountId) {
        var queryPages = getTable()
                .index("account-index") // Nome do GSI
                .query(r -> r.queryConditional(QueryConditional.keyEqualTo(k -> k.partitionValue(accountId))));

        return queryPages.stream()
                .flatMap(page -> page.items().stream())
                .findFirst();
    }

    @Override
    public PreferenceEntity save(PreferenceEntity preference) {
        getTable().putItem(preference);
        return preference;
    }

    @Override
    public PreferenceEntity update(PreferenceEntity preference) {
        getTable().updateItem(preference);
        return preference;
    }
}
