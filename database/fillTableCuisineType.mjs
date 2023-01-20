import client from './client.mjs';
import {cuisineTypeData} from '../Data/cuisineData.mjs';



client.connect()
    .then(() => {
        client.query(`DELETE FROM "cuisineType"`)
        for (let cuisine of cuisineTypeData) {
            client.query((`INSERT INTO  "cuisineType" ("cuisineType", photo)
      VALUES ($1,$2) RETURNING *`),
                [cuisine.cuisineType, cuisine.photo])
        };
    })

    .then(() => client.query(`select * from "cuisineType" order by id `))
    .then((results) => { console.table(results.rows) })
    .catch((err) => { console.log('Something wrong' + err) })
    .finally(() => client.end())