# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to setup the project

### 1. Use `yarn` command to install all required node modules

### 2. Create two databases on prostgres one for developmet and another for testing

Make sure that your dabase server is running on default port 5432

### 3. Create .env and add the below variables to it according to the databse server configration

```
PG_HOST=127.0.0.1
PG_USER=[database user]
PG_PWD=[database user password]
PG_DB=[postgres database name]
PG_DB_TEST=[postgres test database name]
PG_PORT=5432
ENV=dev
BCRYPT_PASSWORD=[bcrypt secret password]
SALT_ROUNDS=10
TOKEN_SECRET=[token secret word]
```

### 4. Run and test terminal commands

For creating database tables use: `~ db-migrate up`

For running the server and call endpoints use: `~ yarn watch`

For unit testing use: `~ yarn test`

### 5. Plan to Meet Requirements

In this repo there is a [`REQUIREMENTS.md`](https://github.com/egylamp/FWD-T3-Storefront-Backend-Project/blob/main/REQUIREMENTS.md) document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.
