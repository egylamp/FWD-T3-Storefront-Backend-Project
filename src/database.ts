import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const {
    PG_HOST,
    PG_USER,
    PG_PWD,
    PG_DB,
    PG_DB_TEST,
    ENV
} = process.env;

// connection handler has any type because we change from development database to test database in unit testing
let dbconn;
if(ENV === 'dev'){
    dbconn = new Pool({
    host:PG_HOST,
    database:PG_DB,
    user:PG_USER,
    password:PG_PWD,
    });
}
if(ENV === 'test'){
    dbconn = new Pool({
    host:PG_HOST,
    database:PG_DB_TEST,
    user:PG_USER,
    password:PG_PWD,
    });
}

export default dbconn;