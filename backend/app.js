const express = require("express");
const connectToDB = require("./connection/connection.js");
const authRoutes = require("./routers/auth.js");
const listouter = require("./routers/list.js")

const app = express();
const PORT = 5000;

app.use(express.json());

connectToDB();

app.use("/api/auth", authRoutes);
app.use("/api/router",listouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
