require('dotenv').config(); //loads env

import express from "express";  //-module modern version
// const express = require("express"); //commonjs which is of old vesion
const app = express();
app.get("/", (req, res) => {
    res.status(200).send("request handled successfully");
    //200 then successful...400 then unsuccessful...404);

});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

app.post("/signup", (req, res) => {
  res.send("User signed up!");
});

app.patch("/user/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} updated.`);
});


/*app.listen(8000, () => {
    console.locg("Server running on port 8000");
}); //which port is ran by the backend for backent 8000, for frontend 3000

 // "test": "echo \"Error: no test specified\" && exit 1" use after script// */

 const PORT = process.env.PORT || 3000; // fallback to 3000 if PORT not set

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
