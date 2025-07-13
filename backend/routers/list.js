const router = require("express").Router();
const User = require("../models/user.js");
const List = require("../models/list.js");

router.post("/body", async (req, res) => {
    try {
        const { title, email, body } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Please signup first" });
        }

        const newList = new List({
            title,
            body,
            user: existingUser._id
        });

        await newList.save();

        existingUser.list.push(newList._id);
        await existingUser.save();

        res.status(200).json({ List: newList });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/update", async (req, res) => {
    try {
        const { email, listId, newBody } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please signup first" });
        }

        const listItem = await List.findOne({ _id: listId, user: user._id });
        if (!listItem) {
            return res.status(404).json({ message: "List item not found or not owned by user" });
        }

        listItem.body = newBody;
        await listItem.save();

        res.status(200).json({ message: "List updated successfully", list: listItem });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


router.get("/get-lists", async (req, res) => {
    try {
        const { email } = req.query;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please signup first" });
        }

        const lists = await List.find({ user: user._id });
        res.status(200).json({ message: "Lists fetched successfully", lists });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.delete("/delete-list", async (req, res) => {
    try {
        const { email, listId } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please signup first" });
        }

        const listItem = await List.findOneAndDelete({ _id: listId, user: user._id });
        if (!listItem) {
            return res.status(404).json({ message: "List item not found or not owned by user" });
        }

        user.List = user.List.filter(id => id.toString() !== listId);
        await user.save();

        res.status(200).json({ message: "List item deleted successfully", deletedItem: listItem });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


module.exports = router;