const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

const initializeDB = async() => {
        await mongoose
        .connect(mongoURI)
        .then(() => {
            console.log("Connected To DB...")
        }).catch(()=>{
            console.log("Error conneting to the DB.")
        })
    } 

    module.exports = {initializeDB};