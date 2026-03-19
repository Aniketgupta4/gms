const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// 🌐 CORS: Production mein dynamic frontend URL allow karo
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Database Connection
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

// Render par NODE_ENV default "production" hota hai
if (process.env.NODE_ENV === "production") {
    
    // 1. Static Folder ko point karo (Extra '/' hata diya hai path.join se)
    app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

    /* 2. FIX: Express 5.0 ke liye Wildcard Route badla hai.
       "(.*)" ki jagah "/:path*" use karein taaki crash na ho.
    */
    app.get("/:path*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "gms-frontend", "build", "index.html"));
    });

} else {
    // Local development ke liye default route
    app.get("/", (req, res) => {
        res.send("Gym Management API is running locally...");
    });
}

// -------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
})