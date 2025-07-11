const express = require("express")
const app = express();
require("./connection/connection.js")

app.get("/", (req,res) => {
    res.send("hello");
});

app.listen(1000, () => {
    console.log("server started");
});