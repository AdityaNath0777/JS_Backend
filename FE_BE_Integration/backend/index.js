// const express = require("express");

// if using 'import'
import express from 'express'; // set "type": "module" in the package.json 

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: "01",
      joke_name: "First Joke",
      desc: "You",
    },
    {
      id: "02",
      joke_name: "Second Joke",
      desc: "JoJo is best pilot",
    },
    {
      id: "03",
      joke_name: "Third Joke",
      desc: "Panda wa Panda ja nai",
    },
    {
      id: "04",
      joke_name: "Fourth Joke",
      desc: "Ore wa group of pandas's King",
    },
    {
      id: "05",
      joke_name: "Fifth Joke",
      desc: "You are still here? That's clarify why you have Absolute K friends",
    },
  ];

  res.json(jokes);
});

app.listen(port, () => {
  console.log(`the backend app is listening at port: ${port}`);
});
