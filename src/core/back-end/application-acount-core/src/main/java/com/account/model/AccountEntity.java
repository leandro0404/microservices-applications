package com.account.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.time.Instant;
import java.util.UUID;

@DynamoDbBean
public class AccountEntity {
    private String id;
    private String helm;       // Chave de ordenação (Sort Key)
    private String sub;        // Identificador único (sub) usado como Partition Key
    private Instant createdAt; // Data de criação
    private Instant updatedAt; // Data de atualização
    private Instant lastAccessed;
    // Construtor vazio necessário para o DynamoDB
    public AccountEntity() {
    }

    // Construtor para facilitar a criação de instâncias
    public AccountEntity(String sub) {
        this.id = UUID.randomUUID().toString();  // Gerar UUID para o id
        this.sub = sub;
        this.helm = "DEFAULT";  // Definido como "DEFAULT", mas pode ser alterado conforme necessário
        this.createdAt = Instant.now();
        this.updatedAt = null;
        this.lastAccessed = null;
    }

    @DynamoDbPartitionKey
    @DynamoDbAttribute("id")  // Chave de partição é o id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbSortKey
    @DynamoDbAttribute("helm")  // Chave de ordenação é o helm
    public String getHelm() {
        return helm;
    }

    public void setHelm(String helm) {
        this.helm = helm;
    }

    @DynamoDbAttribute("sub")
    @DynamoDbSecondaryPartitionKey(indexNames = {"sub-index"})  // Usando sub como chave secundária
    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    @DynamoDbAttribute("createdAt")  // Mapeando o campo createdAt
    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @DynamoDbAttribute("updatedAt")  // Mapeando o campo updatedAt
    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void update() {
        this.updatedAt = Instant.now();  // Atualizar a data de modificação
    }

    @DynamoDbAttribute("lastAccessed")  // Novo mapeamento para lastAccessed
    public Instant getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(Instant lastAccessed) {
        this.lastAccessed = lastAccessed;
    }
    public void updateLastAccessed() {
        this.lastAccessed = Instant.now();  // Atualizar o último acesso
    }
}
