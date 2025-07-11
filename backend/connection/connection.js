const mongoose = require("mongoose");

const con = async(req,res) => {
    try {
        await mongoose
        .connect(
         "mongodb+srv://ansita6050:Ansita@cluster0.turi45c.mongodb.net/"
        )
        .then(() => {
            console.log("Connected");
        })
    } catch (error) {
        res.status(400).json({
            message: "message connected",
        });
    }
};
con();