import client from "../database/client.mjs";


//Add menu details
export const menuDetails = async (req, res) => {
    try {
        const { description, name, date, price, userOrder_rating, chefTable_id, photoUrl } = req.body;
        console.log(req.body)
        const menuInfo = `INSERT INTO  "menuDetails"(description, name, date, price, "userOrder_rating", "chefTable_id", "photoUrl")
        VALUES ($1, $2, $3, $4,$5,$6,$7)`
        await client.query(menuInfo, [description, name, date, price, userOrder_rating, chefTable_id, photoUrl])
        return res.send({ info: "Menu added" })
    } catch (error) {
        console.error(error.message)
        return res.status(500).send({ error: "internal server error" })
    }
}

