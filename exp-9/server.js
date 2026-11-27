require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express();
app.use(cors()); 
app.use(express.json());

// --- 1. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// --- 2. USER MODEL ---
const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// --- 3. REGISTER ROUTE ---
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(400).json({ message: "Email already exists" });
    }
});

// --- 4. LOGIN ROUTE ---
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).json({ message: "Logged in successfully!", token: token });
});

// --- 5. LOGOUT ROUTE ---
app.post('/logout', (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Logged out successfully (Token verified)", user: verified });
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
});

// Start server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));