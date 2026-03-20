// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const PORT = process.env.PORT || 4000;

// // ✅ CORS FIX (multi-origin support)
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://gys-aniket-gupta.onrender.com"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

// app.use(cookieParser());
// app.use(express.json());

// // 🗄️ Database Connection
// require('./DBConn/conn');

// // 🛣️ API Routes
// const GymRoutes = require('./Routes/gym');
// const MembershipRoutes = require('./Routes/membership');
// const MemberRoutes = require('./Routes/member');

// app.use('/auth', GymRoutes);
// app.use('/plans', MembershipRoutes);
// app.use('/members', MemberRoutes);

// // -------------------------- DEPLOYMENT SETTINGS --------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {

//     // 🔹 Serve React build
//     app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

//     // 🔥 Express 5 FIX (no crash)
//     app.get(/.*/, (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname1, "gms-frontend", "build", "index.html")
//         );
//     });

// } else {

//     app.get("/", (req, res) => {
//         res.send("Gym Management API is running locally...");
//     });

// }

// // -------------------------------------------------------------------------

// // 🚀 Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
// });



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

  // 🔹 Serve React build
  app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

  // 🔥 FINAL FIX (Express 5 safe)
  app.use((req, res, next) => {
    if (req.method === "GET") {
      return res.sendFile(
        path.resolve(__dirname1, "gms-frontend", "build", "index.html")
      );
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
  console.log(`🚀 Server is running on port ${PORT}`);
});
