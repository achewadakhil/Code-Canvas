
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
export const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
