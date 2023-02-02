import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import client from "../../database/client.mjs";

const registerChef = async (req, res) => {
    const { email, password, aboutMe, cuisineType, postCode, chefPhoto, secondName, firstName, address, phone } = req.body
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
                const chef = {
                    email: email,
                    password: hash,
                    aboutMe: aboutMe,
                    cuisineType: cuisineType,
                    postCode: postCode,
                    chefPhoto: chefPhoto,
                    secondName: secondName,
                    firstName: firstName,
                    address: address,
                    phone: phone
                };
                let flag = 1;
                //Declaring a flag
                console.log(chef)
                //Inserting data into the database
                client
                    .query(`
                        WITH ins AS (
                        INSERT INTO "Login" (email, password)
                        VALUES ($1, $2)
                        RETURNING id
                        ), ins2 AS (
                        INSERT INTO "chefTable" ("aboutMe", "cuisineType",  "postCode", "chefPhoto")
                        VALUES ($3, $4, $5, $6)
                        RETURNING id
                        )
                        INSERT INTO "userTable" ( name, "pre-nom", address, "postCode", phone, "chefTable_id", login_id)
                        SELECT $7, $8, $9, $10, $11, ins2.id, ins.id
                        FROM ins, ins2;
                    `, [chef.email, chef.password, chef.aboutMe, chef.cuisineType, chef.postCode, chef.chefPhoto, chef.secondName, chef.firstName, chef.address, chef.postCode, chef.phone], (err) => {
                        if (err) {
                            flag = 0;
                            //If user is not inserted is not inserted to database assigning flag as 0/false.
                            console.error(err);
                            return res.send({
                                error: "Database error"
                            })
                        }
                        else {
                            flag = 1;
                            res.status(200).send({ message: 'Chef added to database' });
                        }
                    })
                //jwt token
                if (flag) {
                    const token = jwt.sign( //Signing a jwt token
                        {
                            email: chef.email
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

export default registerChef