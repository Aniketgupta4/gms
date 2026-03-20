const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// 🌐 CORS Config - Isse Local aur Production dono chalenge
app.use(cors({
    origin: [
        process.env.FRONTEND_URL, 
        'http://localhost:3000', 
        'https://gys-aniket-gupta.onrender.com'
    ].filter(Boolean),
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// 🗄️ Database Connection
require('./DBConn/conn');

// 🛣️ API Routes
const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth', GymRoutes);
app.use('/plans', MembershipRoutes);
app.use('/members', MemberRoutes);

// -------------------------- DEPLOYMENT SETTINGS --------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    // 1. Static files (CSS/JS/Images) serve karo
    // Isse 'output.css' wala MIME type error solve ho jayega
    app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

    // 2. 🔥 FINAL FIX (No Wildcard Crash & No Style Glitch)
    app.use((req, res, next) => {
        if (req.method === 'GET' && 
            !req.path.startsWith('/auth') && 
            !req.path.startsWith('/plans') && 
            !req.path.startsWith('/members') &&
            !req.path.includes('.')) { // 👈 Ye '.' check CSS files ko protect karta hai
            return res.sendFile(path.resolve(__dirname1, "gms-frontend", "build", "index.html"));
        }
        next();
    });
} else {
    app.get("/", (req, res) => {
        res.send("Gym Management API is running locally...");
    });
}

// -------------------------------------------------------------------------

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`🚀 Elite Status: Server is running on port ${PORT}`);
});