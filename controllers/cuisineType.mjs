import client from "../database/client.mjs";

//Add new cuisine type
export const cuisineType = async (req, res) => {
    try {
        const cuisineDetails = `INSERT INTO  "cuisineType" ("cuisineType", photo)
        VALUES ($1,$2) RETURNING *`;
        const {
            cuisineType,
            photo
        } = req.body;

        await client.query(cuisineDetails, [
            cuisineType, photo
        ]);

        return res.json({ info: "menu added" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "internal server error" });
    }
};


//Get all cuisine types
export const getAllCuisines = async (req, res) => {
    try {
        let result = await client.query(`SELECT * FROM "cuisineType"`);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Error: something went wrong" })
    }
}


//Get one cuisine type
export const getOneCuisine = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await client.query(`SELECT * FROM "cuisineType" WHERE id = ${id}`);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Error: something went wrong" })
    }
}
