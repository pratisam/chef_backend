import pkg from "pg";
const { Client } = pkg;

const client = new Client({
    user : "homechef_admin",
    password :"homechef",
    host : "localhost",
    port : 5432,
    database: "homecheftrial"

})
export default client;