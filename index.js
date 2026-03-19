const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path'); // 👈 Path module import karo
require('dotenv').config();

const PORT = process.env.PORT || 4000; // 👈 Render default port 10000 bhi de sakta hai

// 🌐 CORS: Production mein localhost kaam nahi karega
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
require('./DBConn/conn');

// 🛣️ API Routes
const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth', GymRoutes);
app.use('/plans', MembershipRoutes);
app.use('/members', MemberRoutes);

// -------------------------- DEPLOYMENT SETTINGS --------------------------

// 1. Frontend folder path define karo (gms-frontend ke andar build/dist folder)
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Static folder point karo (CRA ke liye 'build', Vite ke liye 'dist')
  app.use(express.static(path.join(__dirname1, "/gms-frontend/build")));

  // Kisi bhi aur route par index.html serve karo
  app.get("(.*)", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "gms-frontend", "build", "index.html"));
  });
} else {
  // Local development ke liye default route
  app.get("/", (req, res) => {
    res.send("Gym Management API is running...");
  });
}

// -------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
})