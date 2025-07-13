const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Signup
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10); 
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Please signup first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is not correct" });
        }

        res.status(200).json({ message: "Login successful", user: existingUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/update", async (req,res) => {
    try{
    const { email, oldpassword , newpassword } = req.body;

        const existing = await User.findOne({ email });
        if (!existing) {
            return res.status(400).json({ message: "Please signup first" });
        }

        const hashednew = bcrypt.compareSync(oldpassword, user.password);
        if(!hashednew){
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const newhashed = bcrypt.hashSync(newpassword,10);
        User.password = newhashed;

        await User.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;