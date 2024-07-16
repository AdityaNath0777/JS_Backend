// require('dotenv').config({path: "./.env"}) // now it brings inconsistency in importing

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    let port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Error :: before app on :: ", error)
    app.on("error", (error) => {
      console.log("MongoDB Error :: within app on :: ", error)
      throw error;
    })
  });

// First Approach using IIFE (Imm. invoked func expression)
/*
import express from "express";
const app = express()
(async ()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("ERROR:: ", error);
      throw error;
    })

  } catch (error) {
    console.log("Error:: ", error); 
    throw error;
  }
})() 
*/
