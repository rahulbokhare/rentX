const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");



const PORT = process.env.PORT;

async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/rentX');
        console.log("database connected")
        app.listen(PORT,() => {
        console.log(`server is listening through${PORT}`)
        });
    }catch(err){
        console.log(err);
    }
}

main()