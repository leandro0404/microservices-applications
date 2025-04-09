package com.account.person.repository;

import com.account.person.model.PersonEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.Optional;

@ApplicationScoped
public class PersonRepositoryImpl implements PersonRepository {

    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;
    private static final String TABLE_NAME = "application-person";

    @Inject
    public PersonRepositoryImpl(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
    }

    private DynamoDbTable<PersonEntity> getTable() {
        return dynamoDbEnhancedClient.table(TABLE_NAME, TableSchema.fromBean(PersonEntity.class));
    }

    @Override
    public Optional<PersonEntity> findById(String id) {
        PersonEntity person = getTable().getItem(r -> r.key(k ->
                k.partitionValue(id)
        ));
        return Optional.ofNullable(person);
    }

    @Override
    public Optional<PersonEntity> findByAccountId(String accountId) {
        var queryPages = getTable()
                .index("account-index") // Nome do GSI
                .query(r -> r.queryConditional(QueryConditional.keyEqualTo(k -> k.partitionValue(accountId))));

        return queryPages.stream()
                .flatMap(page -> page.items().stream())
                .findFirst();
    }

    @Override
    public PersonEntity save(PersonEntity person) {
        getTable().putItem(person);
        return person;
    }

    @Override
    public PersonEntity update(PersonEntity person) {
        getTable().updateItem(person);
        return person;
    }
} 