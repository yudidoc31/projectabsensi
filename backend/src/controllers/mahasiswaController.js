const pool = require('../database');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

// Get student data by token
exports.getMahasiswaData = async (req, res) => {
    try {
        const token = req.query.token;
        console.log(req.query);
        const { userId }  = jwt.verify(token, "your-secret-key");
    
        const user = await User.getById(userId);
        return res.json({ user });
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
}