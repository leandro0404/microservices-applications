package com.profile.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.time.Instant;

@DynamoDbBean
public class ProfileEntity {
    private String id;
    private String accountId;  // Chave de partição (Partition Key)
    private String helm;       // Chave de ordenação (Sort Key)
    private String name;
    private String biography;
    private String avatarUrl;
    private Instant createdAt; // Campo para a data de criação
    private Instant updatedAt; // Campo para a data de atualização

    // Construtor vazio necessário para o DynamoDB
    public ProfileEntity() {
    }

    // Construtor para facilitar a criação de instâncias
    public ProfileEntity(String id, String accountId, String helm,  String name, String biography, String avatarUrl) {
        this.id = id;
        this.accountId = accountId;
        this.helm = helm != null ? helm : "DEFAULT";  // Definir DEFAULT caso não seja passado
        this.name = name;
        this.biography = biography;
        this.avatarUrl = avatarUrl;
        this.createdAt = Instant.now();
        this.updatedAt = null;
    }

    @DynamoDbPartitionKey
    @DynamoDbAttribute("accountId")  // Agora a chave de partição é accountId
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @DynamoDbSortKey
    @DynamoDbAttribute("helm")  // Chave de ordenação é o helm
    public String getHelm() {
        return helm;
    }

    public void setHelm(String helm) {
        this.helm = (helm != null) ? helm : "DEFAULT";  // Garantir DEFAULT se for null
    }

    @DynamoDbSecondaryPartitionKey(indexNames = {"id-index"})
    @DynamoDbAttribute("id")  // Mapeando a coluna id para o GSI
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbAttribute("name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @DynamoDbAttribute("biography")
    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    @DynamoDbAttribute("avatarUrl")
    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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
}
