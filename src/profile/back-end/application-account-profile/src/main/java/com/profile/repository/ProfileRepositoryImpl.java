package com.profile.repository;

import com.profile.model.ProfileEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProfileRepositoryImpl implements ProfileRepository {

    public static final String GSI_NAME = "id-index";
    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;
    private static final String TABLE_NAME = "application-profile";
    private static final String DEFAULT_HELM = "DEFAULT";

    @Inject
    public ProfileRepositoryImpl(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
    }

    private DynamoDbTable<ProfileEntity> getTable() {
        return dynamoDbEnhancedClient.table(TABLE_NAME, TableSchema.fromBean(ProfileEntity.class));
    }

    @Override
    public Optional<ProfileEntity> find(String accountId, String helm) {
        ProfileEntity profile = getTable().getItem(r -> r.key(k ->
                k.partitionValue(accountId)
                        .sortValue(helm != null ? helm : DEFAULT_HELM)
        ));
        return Optional.ofNullable(profile);
    }

    @Override
    public Optional<ProfileEntity> findById(String id) {

        var queryPages = getTable()
                .index("id-index") // Nome do GSI
                .query(r -> r.queryConditional(QueryConditional.keyEqualTo(k -> k.partitionValue(id))));


        return queryPages.stream()
                .flatMap(page -> page.items().stream()) // Planificar os itens das páginas
                .findFirst();

    }

    @Override
    public List<ProfileEntity> find(String accountId) {
        return getTable().scan(r -> r.filterExpression(
                Expression.builder()
                        .expression("accountId = :accountId")
                        .putExpressionValue(":accountId", AttributeValue.builder().s(accountId).build())
                        .build()
        )).items().stream().collect(Collectors.toList());
    }

    @Override
    public void save(ProfileEntity profile) {
        getTable().putItem(profile);
    }

    @Override
    public void update(ProfileEntity profile) {
        getTable().updateItem(profile);
    }

    @Override
    public void delete(ProfileEntity profile) {
        getTable().deleteItem(profile);
    }
}
