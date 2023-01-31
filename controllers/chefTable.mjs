import client from "../database/client.mjs";

//Add new chef table
export const chefTable = async (req, res) => {
    try {
        const chefDetails = `INSERT INTO  "chefTable" ("aboutMe", "cuisineType", rating, "postCode", "chefPhoto")
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const {
            aboutMe,
            cuisineType,
            rating,
            postCode,
            chefPhoto
        } = req.body;

        await client.query(chefDetails, [
            aboutMe,
            cuisineType,
            rating,
            postCode,
            chefPhoto
        ]);

        return res.json({ info: "chef info added" });
    } 
    catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: "internal server error" });
    }
};

//Get all chef tables
export const getAllChefTables = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await client.query(`SELECT * FROM "chefTable" WHERE id = $1`, [id])
        res.status(200).json(result.rows)
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Error: something went wrong" })
    }
}

