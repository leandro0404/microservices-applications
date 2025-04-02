# Business Contexts Documentation

This directory contains documentation for each business context in the system. Each context represents a distinct domain with its own frontend application, backend services, and data storage.

## Contexts Overview

### 1. Core Context
The core context provides the foundation for the entire system:
- Main application shell
- Authentication and authorization
- Shared components and utilities
- Common services

### 2. Preference Context
The preference context manages user preferences and settings:
- User preferences management
- Settings configuration
- Preference synchronization
- Preference validation

### 3. Profile Context
The profile context handles user profile management:
- Profile creation and editing
- Profile data management
- Profile search and filtering
- Profile validation

## Context Boundaries

Each context is designed to be independent and self-contained, with clear boundaries:

1. **Frontend Applications**
   - Each context has its own React application
   - Shared components are managed through the core context
   - Independent routing and state management

2. **Backend Services**
   - AWS Lambda functions for each context
   - Context-specific business logic
   - Independent data storage

3. **Data Storage**
   - Separate DynamoDB tables for each context
   - Data isolation between contexts
   - Context-specific data models

## Context Communication

Contexts communicate through well-defined APIs:

1. **API Gateway**
   - Routes requests to appropriate services
   - Handles authentication and authorization
   - Manages API versioning

2. **Cross-Context Communication**
   - Through API calls between services
   - Using shared authentication tokens
   - Following defined API contracts

## Context Documentation

Detailed documentation for each context can be found in the following files:

- [Core Context](core.md)
- [Preference Context](preference.md)
- [Profile Context](profile.md)

Each context document includes:
- Detailed component descriptions
- API specifications
- Data models
- Integration points
- Security considerations 