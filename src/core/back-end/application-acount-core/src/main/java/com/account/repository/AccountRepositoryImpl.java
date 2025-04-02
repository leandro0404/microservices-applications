package com.account.repository;

import com.account.model.AccountEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.Optional;

@ApplicationScoped
public class AccountRepositoryImpl implements AccountRepository {

    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;
    private static final String TABLE_NAME = "application-account";

    @Inject
    public AccountRepositoryImpl(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
    }

    private DynamoDbTable<AccountEntity> getTable() {
        return dynamoDbEnhancedClient.table(TABLE_NAME, TableSchema.fromBean(AccountEntity.class));
    }

    @Override
    public Optional<AccountEntity> findById(String id) {
        AccountEntity account = getTable().getItem(r -> r.key(k ->
                k.partitionValue(id)  // Chave de partição é o ID da conta
        ));
        return Optional.ofNullable(account);
    }

    @Override
    public Optional<AccountEntity> findBySub(String sub) {
        // Consultar o GSI com a chave de partição 'sub'
        var queryPages = getTable()
                .index("sub-index") // Nome do GSI
                .query(r -> r.queryConditional(QueryConditional.keyEqualTo(k -> k.partitionValue(sub))));

        return queryPages.stream()
                .flatMap(page -> page.items().stream()) // Planificar os itens das páginas
                .findFirst();
    }

    @Override
    public AccountEntity save(AccountEntity account) {
        getTable().putItem(account);  // Salvar a conta
        return account;  // Retorna a entidade salva
    }

    @Override
    public AccountEntity update(AccountEntity account) {
        getTable().updateItem(account);  // Atualiza a conta no DynamoDB
        return account;  // Retorna a entidade atualizada
    }
}
