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

### 1. Use "yarn" command to install all required node modules

### 2. Create two databases on prostgres one for developmet and another for testing

### 3. Create .env and add the below variables to it according to the databse server configration

DBHOST=localhost
DBUSER=[database_user]
DBPASS=[database_user_password]
DBNAME=[dev_database_name]
TESTDBNAME=[test_database_name]
ENV=dev
BCRYPT_PASSWORD=[bcrypt_secret_password]
SALT_ROUNDS=10
TOKEN_SECRET=[token_secret_word]

### 4. Create database.json file and add the below code to it according to the databse server configration

{

    "dev":{
        "driver":"pg",
        "host" : "localhost",
        "database" : "[dev_database_name]",
        "user" : "[database_user]",
        "password" : "[database_user_password]",
        "port": "5432"
    },

    "test":{
        "driver":"pg",
        "host" : "localhost",
        "database" : "[test_database_name]",
        "user" : "[database_user]",
        "password" : "[database_user_password]",
        "port": "5432"
    }

}

## Run and test terminal commands

~ yarn watch

~ yarn test

### 5. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.
