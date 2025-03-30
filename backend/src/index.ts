import express from 'express';
import cors from 'cors';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import router from './Routes/TodoRouter';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5002
const MONGO_URI = process.env.MONGODB_URL || "";

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI).then(() => console.log("connect to MongoDb succeccfully...")
).catch((err) => console.log(err)
)

app.use(router);

app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
    );