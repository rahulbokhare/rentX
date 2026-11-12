const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/rentX');
        console.log("database connected")
        app.listen("8080",() => {
        console.log("server is listening through 8080")
        });
    }catch(err){
        console.log(err);
    }
}

main()