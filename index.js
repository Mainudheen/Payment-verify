const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/students',require('./routes/students'));
app.use('/api/payments',require('./routes/payments'));
//connected
//connect MongoDb

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('MongoDB connected');
        app.listen(process.env.PORT, ()=>{
            console.log(`Server running on port ${process.env.PORT}`)
        });
    })
    .catch((err)=>{
        console.error("MongoDB connection error:",err);
    })