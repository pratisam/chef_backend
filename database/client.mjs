import { Client } from "pg"

const client = new Client({
    user : "homecheftrial_admin",
    password :"homechef",
    host : "localhost",
    port : 5432,
    database: "homecheftrial"

})
export default client