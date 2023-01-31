import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import client from "../../database/client.mjs";

const register = async (req, res) => {
    const { email, password, secondName, firstName, address, postCode, phone } = req.body
    try {
        const data = await client.query(`SELECT * FROM "Login" WHERE email = $1;`, [email]);
        //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "Email already there, No need to register again.",
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
                    password: hash,
                    secondName: secondName,
                    firstName: firstName,
                    address: address,
                    postCode: postCode,
                    phone: phone
                };
                let flag = 1;
                //Declaring a flag
console.log(user)
                //Inserting data into the database
                client
                    .query(`
                    WITH ins AS (
                    INSERT INTO "Login"
                    (email, password)
                    VALUES
                    ($1, $2)
                    RETURNING id)
                    INSERT INTO "userTable"
                    (name, "pre-nom", address, "postCode", phone, login_id)
                    SELECT $3, $4, $5, $6, $7, id
                    FROM ins;`, [user.email, user.password, user.secondName, user.firstName, user.address, user.postCode, user.phone], (err) => {
                        if (err) {
                            flag = 0;
                            //If user is not inserted is not inserted to database assigning flag as 0/false.
                            console.error(err);
                            return res.status(500).json({
                                error: "Database error"
                            })
                        }
                        else {
                            flag = 1;
                            res.status(200).send({ message: 'User added to database, not verified' });
                        }
                    })
                //jwt token
                if (flag) {
                    const token = jwt.sign( //Signing a jwt token
                        {
                            email: user.email
                        },
                        `${process.env.SECRET_KEY}`
                    );
                };
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registering user!", //Database connection error
        });
    }
}

export default register


