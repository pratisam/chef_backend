import client from './client.mjs';
import {chefTableInfo} from '../Data/chefTablesData.mjs';




client.connect()
    .then(() => {
        client.query(`DELETE FROM "chefTable"`)
        for (let info of chefTableInfo) {
            client.query((`INSERT INTO  "chefTable" ("aboutMe", "cuisineType", rating, "postCode", "chefPhoto")
      VALUES ($1, $2, $3, $4, $5) RETURNING *`),
                [info.aboutMe, info.cuisineType, info.rating, info.postCode, info.chefPhoto])
        };
    })

    .then(() => client.query(`select * from "chefTable" order by id `))
    .then((results) => { console.table(results.rows) })
    .catch((err) => { console.log('Something wrong' + err) })
    .finally(() => client.end())