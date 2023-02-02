import dotenv from "dotenv";
import express from 'express';
import bodyParser from 'body-parser';
import cookie from 'cookie-parser';
import dbConnect from './database/dbConnect.mjs';
import cors from 'cors';
import {cuisineType, getAllCuisines, getOneCuisine} from './controllers/cuisineType.mjs';
import {chefTable, getAllChefTables} from './controllers/chefTable.mjs';
import {menuDetails} from './controllers/menuDetails.mjs';
import register from './controllers/registration/register.mjs';
import registerChef from './controllers/registration/registerChef.mjs';
import logUser from './controllers/registration/login.mjs'

dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cookie());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

console.log('hello world')
//Cuisine Types
app.post('/home', cuisineType);
app.get("/home", getAllCuisines);
app.get("/home/:id", getOneCuisine);

// Chef table info
app.post('/home/ChefList', chefTable);
app.get('/home/:id/ChefList', getAllChefTables);

//Menu details
app.post('/menu_details', menuDetails);

// Registration
app.post('/home/LoginPage/userForm', register)
// Chef registration
app.post('/home/LoginPage/chefForm', registerChef)
//Login
app.post('/home/LoginPage', logUser)


app.listen(PORT, () => console.log(`Server started: localhost ${PORT}`))