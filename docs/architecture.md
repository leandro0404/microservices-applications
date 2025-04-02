# Documentação da Arquitetura

## Visão Geral

Este documento descreve a arquitetura do nosso sistema de microsserviços e microfrontends. A arquitetura segue o modelo C4 para visualização e documentação, com clara separação de responsabilidades e contextos de negócio.

## Contexto do Sistema

O sistema está dividido em três contextos principais de negócio:
1. Core - Aplicação principal e serviços compartilhados
2. Preference - Gerenciamento de preferências do usuário
3. Profile - Gerenciamento de perfis do usuário

Cada contexto tem seu próprio:
- Aplicação frontend (microfrontend)
- Serviços backend (microsserviços)
- Armazenamento de dados
- Autenticação e autorização

## Padrões de Arquitetura

### Microfrontends
- Cada aplicação frontend é independentemente implantável
- Componentes e estilos compartilhados são gerenciados através de uma biblioteca core
- As aplicações se comunicam através de APIs bem definidas
- Cada aplicação tem seu próprio roteamento e gerenciamento de estado

### Microsserviços
- Serviços backend implementados como funções AWS Lambda
- Serviços organizados por contexto de negócio
- Comunicação entre serviços é tratada através do API Gateway
- Cada serviço tem seu próprio esquema de banco de dados no DynamoDB

### Autenticação
- Sistema de autenticação baseado em OIDC
- Gerenciamento centralizado de identidade
- Regras de autorização específicas por contexto
- Comunicação segura baseada em tokens

## Componentes do Sistema

### Aplicações Frontend
1. **Frontend Core**
   - Shell principal da aplicação
   - Navegação e roteamento
   - Biblioteca de componentes compartilhados
   - Gerenciamento de autenticação

2. **Frontend de Preferências**
   - Gerenciamento de preferências do usuário
   - Interface de configurações
   - Sincronização de preferências

3. **Frontend de Perfis**
   - Gerenciamento de perfis do usuário
   - Criação e edição de perfis
   - Visualização de dados de perfil

### Serviços Backend
1. **Serviços Core**
   - Serviço de autenticação
   - Gerenciamento de usuários
   - Utilitários compartilhados

2. **Serviços de Preferências**
   - Operações CRUD de preferências
   - Sincronização de preferências
   - Validação de preferências

3. **Serviços de Perfil**
   - Operações CRUD de perfis
   - Validação de dados de perfil
   - Busca e filtragem de perfis

### Infraestrutura
- AWS API Gateway
- AWS Lambda
- DynamoDB
- CloudFront (para hospedagem frontend)
- Provedor OIDC

## Fluxo de Dados

1. **Fluxo de Autenticação**
   - Usuário autentica através do OIDC
   - Token é emitido e armazenado
   - Token é usado para chamadas subsequentes à API

2. **Comunicação via API**
   - Aplicações frontend se comunicam com backend através do API Gateway
   - API Gateway roteia requisições para funções Lambda apropriadas
   - Funções Lambda processam requisições e interagem com DynamoDB

3. **Armazenamento de Dados**
   - Cada contexto tem suas próprias tabelas DynamoDB
   - Dados são isolados entre contextos
   - Acesso a dados entre contextos é gerenciado através de APIs

## Considerações de Segurança

1. **Autenticação**
   - Implementação OIDC
   - Validação de token JWT
   - Mecanismo de atualização de token

2. **Autorização**
   - Controle de acesso específico por contexto
   - Permissões baseadas em funções
   - Autorização do API Gateway

3. **Segurança de Dados**
   - Dados criptografados em repouso
   - Canais de comunicação seguros
   - Isolamento de dados entre contextos

## Arquitetura de Implantação

1. **Implantação Frontend**
   - Arquivos estáticos hospedados no CloudFront
   - Pipeline CI/CD para cada aplicação frontend
   - Controle de versão e capacidade de rollback

2. **Implantação Backend**
   - Funções Lambda implantadas através do AWS SAM
   - Gerenciamento de configuração do API Gateway
   - Versionamento de esquema de banco de dados

3. **Infraestrutura**
   - Infraestrutura como Código (IaC)
   - Pipelines de implantação automatizados
   - Configuração de monitoramento e logging

## Monitoramento e Observabilidade

1. **Logging**
   - Sistema de logging centralizado
   - Separação de logs por contexto
   - Agregação e análise de logs

2. **Métricas**
   - Coleta de métricas de performance
   - Monitoramento de taxa de erros
   - Estatísticas de uso

3. **Rastreamento**
   - Rastreamento distribuído
   - Visualização de fluxo de requisições
   - Identificação de gargalos de performance 