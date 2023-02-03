import * as dotenv from 'dotenv'
import pkg from 'pg';

dotenv.config()
const { Client } = pkg;


// const client = new Client({
// connectionString: process.env.DATABASE_URL || "development",
// ssl: {
//     rejectUnauthorized: false
// }

// });

// client.connect((err) => {
// if (err) {
//     console.error('connection error', err.stack)
// } else {
//     console.log('connected')
// }
// })

const client = (() => {
    if (process.env.NODE_ENV !== 'production') {
        return new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: false
        });
    } else {
        return new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });
    } })();

export default client;