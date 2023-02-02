import bcrypt from "bcrypt"
import client from "../../database/client.mjs";


const forgotPassword = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await client.query(`SELECT * FROM "Login" WHERE email = $1;`, [email]);
        //Checking if user already exists
        const arr = data.rows;
        if (arr.length === 0) {
            return res.status(400).json({
                error: "Email not registered. sign up for register.",
            });
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const user = {
                    email: email,
                    password: hash
                };
                client
                    .query(`UPDATE "Login" SET  password = $1 WHERE email = $2;`, [user.password, user.email], (err) => {

                        if (err) {
                            //If user is not inserted is not inserted to database assigning flag as 0/false.
                            console.error(err);
                            return res.status(400).send({
                                error: "Database error"
                            })
                        }
                        else {
                            res.status(200).send({ message: 'password changed' });
                        }
                    })
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    }
}

export default forgotPassword
// {
//     "email": "homechef2@app.com",
//     "password": "homechef2"
// }