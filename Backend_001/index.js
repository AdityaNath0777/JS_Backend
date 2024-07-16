// test message
// console.log(" Raam Bhai sareya ne! \\(^ ^)/");

require('dotenv').config()
const express = require("express");

const app = express();
const port = /*3000*/ 4000;
// or any other available port

app.get("/", (req, res) => {
  res.send(" Raam Bhai sareya ne! \\(^ ^)/");
});

app.get("/twitter", (req, res) => {
  res.send("AdityaOfficia15");
});

app.get("/login", (req, res) => {
  res.send("<h1>Login at Shikanji aur Code</h1>");
});

app.get("/youtube", (req, res) => {
  res.send("<h2>Shikanji aur Code</h2>");
});

// hot reloading-> needs to restart the server here
app.listen(process.env.PORT, () => {
  // although port -> 4000
  // env PORT -> 3000
    // so localhost:3000 is actually listening 
  console.log(`Example app is listening on port ${port}`);
});
