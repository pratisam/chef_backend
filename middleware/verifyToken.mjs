import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const auth = async (request, response, next) => {
  //   get the token from the authorization header
  const token = await request.cookies.access_token;
    console.log(token,`Access token`)
  if (!token) {
    return response.sendStatus(403);
  }
  //check if the token matches the supposed origin
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    request.userId = data.user.id;
    request.userEmail = data.user.email;
    request.exp = data.exp;
    return next();
  } catch {
    return response.sendStatus(403);
  }
};

export default auth;