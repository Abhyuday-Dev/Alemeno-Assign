const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
require('dotenv').config();
const userRouter = require("./routes/user");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/user", userRouter);


//Connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connection successful');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

//Start Server on port 3000
app.listen(3000,() => {
    console.log("Server Running on port 3000");
});
