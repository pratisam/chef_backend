import pkg from "pg";
import dotenv from "dotenv";
const { Client } = pkg;
dotenv.config();

const client = new Client({
    user : process.env.USER,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    port : 5432,
    database: process.env.DATABASE

})
export default client;