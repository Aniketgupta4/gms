const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// 🌐 CORS Config
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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

    // 🔹 Serve frontend build
    app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

    // 🔥 FIXED: Catch-all route (IMPORTANT)
    app.get("/*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname1, "gms-frontend", "build", "index.html")
        );
    });

} else {

    // Local route
    app.get("/", (req, res) => {
        res.send("Gym Management API is running locally...");
    });

}

// -------------------------------------------------------------------------

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});