import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const {
    DBHOST,
    DBUSER,
    DBPASS,
    DBNAME,
    TESTDBNAME,
    ENV
} = process.env;
let dbconn = new Pool();
if(ENV === 'dev'){
    dbconn = new Pool({
    host:DBHOST,
    database:DBNAME,
    user:DBUSER,
    password:DBPASS,
    });
}
if(ENV === 'test'){
    dbconn = new Pool({
    host:DBHOST,
    database:TESTDBNAME,
    user:DBUSER,
    password:DBPASS,
    });
}

export default dbconn;