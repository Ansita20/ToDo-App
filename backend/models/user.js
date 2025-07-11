const mongoose = required("mongoose");
const userSchema = {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    list: [
    {
        type: mongoose.Types.ObjectId,
        ref: "list"
    }
    ]
}

module.exports = mongoose.model("user",userSchema);