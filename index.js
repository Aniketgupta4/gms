// // const express = require('express');
// // const app = express();
// // const cookieParser = require('cookie-parser');
// // const cors = require('cors');
// // const path = require('path');
// // require('dotenv').config();

// // const PORT = process.env.PORT || 4000;

// // // ✅ CORS FIX (multi-origin support)
// // const allowedOrigins = [
// //   "http://localhost:3000",
// //   "https://gys-aniket-gupta.onrender.com"
// // ];

// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error("Not allowed by CORS"));
// //     }
// //   },
// //   credentials: true
// // }));

// // app.use(cookieParser());
// // app.use(express.json());

// // // 🗄️ Database Connection
// // require('./DBConn/conn');

// // // 🛣️ API Routes
// // const GymRoutes = require('./Routes/gym');
// // const MembershipRoutes = require('./Routes/membership');
// // const MemberRoutes = require('./Routes/member');

// // app.use('/auth', GymRoutes);
// // app.use('/plans', MembershipRoutes);
// // app.use('/members', MemberRoutes);

// // // -------------------------- DEPLOYMENT SETTINGS --------------------------

// // const __dirname1 = path.resolve();

// // if (process.env.NODE_ENV === "production") {

// //     // 🔹 Serve React build
// //     app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

// //     // 🔥 Express 5 FIX (no crash)
// //     app.get(/.*/, (req, res) => {
// //         res.sendFile(
// //             path.resolve(__dirname1, "gms-frontend", "build", "index.html")
// //         );
// //     });

// // } else {

// //     app.get("/", (req, res) => {
// //         res.send("Gym Management API is running locally...");
// //     });

// // }

// // // -------------------------------------------------------------------------

// // // 🚀 Start Server
// // app.listen(PORT, () => {
// //     console.log(`🚀 Server is running on port ${PORT}`);
// // });



// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const PORT = process.env.PORT || 4000;

// // 🌐 CORS Config
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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

//   // 🔹 Serve React build
//   app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

//   // 🔥 FINAL FIX (Express 5 safe)
//   app.use((req, res, next) => {
//     if (req.method === "GET") {
//       return res.sendFile(
//         path.resolve(__dirname1, "gms-frontend", "build", "index.html")
//       );
//     }
//     next();
//   });

// } else {

//   app.get("/", (req, res) => {
//     res.send("Gym Management API is running locally...");
//   });

// }

// // -------------------------------------------------------------------------

// // 🚀 Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
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
  // 1. Static files serve karo (Isse pehle rakho)
  app.use(express.static(path.join(__dirname1, "gms-frontend", "build")));

  // 2. 🔥 API Routes ke alawa bachi hui sari GET requests ko index.html par bhejo
  // Par dhyan rahe ki ye sirf un paths ke liye ho jo file nahi hain
  app.get("*", (req, res) => {
    // Agar request kisi file (.css, .js, .png) ke liye nahi hai, tabhi index.html bhejo
    if (!req.path.includes(".") && !req.path.startsWith("/auth") && !req.path.startsWith("/plans") && !req.path.startsWith("/members")) {
      res.sendFile(path.resolve(__dirname1, "gms-frontend", "build", "index.html"));
    } else {
      // Agar koi image ya css file missing hai toh 404 do, index.html nahi!
      res.status(404).send("Not Found");
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("Gym Management API is running locally...");
  });
}

// -------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});