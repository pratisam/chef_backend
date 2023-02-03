import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookie from 'cookie-parser';
import dbConnect from './database/dbConnect.mjs';
import cors from 'cors';
import {cuisineType, getAllCuisines, getOneCuisine} from './controllers/cuisineType.mjs';
import {chefTable, getAllChefTables} from './controllers/chefTable.mjs';
import {menuDetails, getMenuDetails} from './controllers/menuDetails.mjs';
import register from './controllers/registration/register.mjs';
import registerChef from './controllers/registration/registerChef.mjs';
import logUser from './controllers/registration/login.mjs';
import forgotPassword from "./controllers/registration/forgotPassword.mjs";
import chefInfo from './controllers/chefInfo.mjs';



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
app.get('/home', getAllCuisines);
app.get('/home/:id', getOneCuisine);
app.get('/:id/chefProfileFull', chefInfo)
// Chef table info
app.post('/home/ChefList', chefTable);
app.get('/home/:id/ChefList', getAllChefTables);


//Menu details
app.post('/menu_details', menuDetails);
app.get('/home/:id/Menu', getMenuDetails)

// Registration
app.post('/home/LoginPage/userForm', register)
// Chef registration
app.post('/home/LoginPage/chefForm', registerChef)
//Login
app.post('/home/LoginPage', logUser)
//Forgot password
app.post('/home/LoginPage/ForgotPassword', forgotPassword)


app.listen(process.env.PORT || 3000, () => console.log(`Server started: localhost `))