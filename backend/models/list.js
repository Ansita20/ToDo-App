const mongoose = require("mongoose");
const listSchema = {
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    user: [
    {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
    ]
}

module.exports = mongoose.model("list",listSchema);