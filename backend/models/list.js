const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("List", listSchema);
