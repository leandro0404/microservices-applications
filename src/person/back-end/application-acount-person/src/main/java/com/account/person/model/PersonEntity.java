package com.account.person.model;

import com.account.person.model.enums.DocumentType;
import com.account.person.model.enums.PersonType;
import com.account.person.model.enums.PhoneType;
import com.account.person.model.enums.StatusType;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@DynamoDbBean
public class PersonEntity {

    private String id;
    private String accountId;
    private StatusType status;
    private PersonType type;
    private String name;
    private Instant birthDate;
    private String companyName;
    private boolean isMEI;
    private List<Document> documents;
    private Address address;
    private List<Phone> phones;
    private Instant createdAt;
    private Instant updatedAt;

    public PersonEntity() {
    }

    public PersonEntity(String accountId) {
        this.id = UUID.randomUUID().toString();
        this.accountId = accountId;
        this.status = StatusType.INPROGRESS;
        this.type = PersonType.INDIVIDUAL_ENTITY;
        this.name = "";
        this.companyName = "";
        this.isMEI = false;
        this.createdAt = Instant.now();
    }

    @DynamoDbPartitionKey
    @DynamoDbAttribute("id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbAttribute("accountId")
    @DynamoDbSecondaryPartitionKey(indexNames = {"account-index"})
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @DynamoDbAttribute("status")
    public StatusType getStatus() {
        return status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    @DynamoDbAttribute("type")
    public PersonType getType() {
        return type;
    }

    public void setType(PersonType type) {
        this.type = type;
    }

    @DynamoDbAttribute("name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @DynamoDbAttribute("birthDate")
    public Instant getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    @DynamoDbAttribute("companyName")
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @DynamoDbAttribute("isMEI")
    public boolean isMEI() {
        return isMEI;
    }

    public void setMEI(boolean MEI) {
        isMEI = MEI;
    }

    @DynamoDbAttribute("documents")
    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    @DynamoDbAttribute("address")
    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @DynamoDbAttribute("phones")
    public List<Phone> getPhones() {
        return phones;
    }

    public void setPhones(List<Phone> phones) {
        this.phones = phones;
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

    @DynamoDbBean
    public static class Document {
        private String id;
        private DocumentType type;
        private String value;

        public Document() {
        }

        public Document(String id, DocumentType type, String value) {
            this.id = id;
            this.type = type;
            this.value = value;
        }

        @DynamoDbAttribute("id")
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        @DynamoDbAttribute("type")
        public DocumentType getType() {
            return type;
        }

        public void setType(DocumentType type) {
            this.type = type;
        }

        @DynamoDbAttribute("value")
        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    @DynamoDbBean
    public static class Address {
        private String street;
        private String number;
        private String complement;
        private String neighborhood;
        private String city;
        private String state;
        private String zipCode;

        public Address() {
        }

        public Address(String street, String number, String complement, String neighborhood, String city, String state, String zipCode) {
            this.street = street;
            this.number = number;
            this.complement = complement;
            this.neighborhood = neighborhood;
            this.city = city;
            this.state = state;
            this.zipCode = zipCode;
        }

        @DynamoDbAttribute("street")
        public String getStreet() {
            return street;
        }

        public void setStreet(String street) {
            this.street = street;
        }

        @DynamoDbAttribute("number")
        public String getNumber() {
            return number;
        }

        public void setNumber(String number) {
            this.number = number;
        }

        @DynamoDbAttribute("complement")
        public String getComplement() {
            return complement;
        }

        public void setComplement(String complement) {
            this.complement = complement;
        }

        @DynamoDbAttribute("neighborhood")
        public String getNeighborhood() {
            return neighborhood;
        }

        public void setNeighborhood(String neighborhood) {
            this.neighborhood = neighborhood;
        }

        @DynamoDbAttribute("city")
        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        @DynamoDbAttribute("state")
        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        @DynamoDbAttribute("zipCode")
        public String getZipCode() {
            return zipCode;
        }

        public void setZipCode(String zipCode) {
            this.zipCode = zipCode;
        }
    }

    @DynamoDbBean
    public static class Phone {
        private String id;
        private PhoneType type;
        private String value;

        public Phone() {
        }

        public Phone(String id, PhoneType type, String value) {
            this.id = id;
            this.type = type;
            this.value = value;
        }

        @DynamoDbAttribute("id")
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        @DynamoDbAttribute("type")
        public PhoneType getType() {
            return type;
        }

        public void setType(PhoneType type) {
            this.type = type;
        }

        @DynamoDbAttribute("value")
        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
} 