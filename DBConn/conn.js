const mongoose = require('mongoose');
require('dotenv').config();

// Database name set to 'gym'
const dbURI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("🚀 Elite Status: Connected to MongoDB Atlas [gym] Successfully!");
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
};

connectDB();
module.exports = mongoose;