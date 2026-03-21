// Routes/gymbot.js
const express = require("express");
const router = express.Router();
require("dotenv").config(); 
const { GoogleGenAI } = require("@google/genai");

// Gemini AI Setup
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "fallback-key"
});

router.post("/ask", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // 🛡️ Gemini se connection
        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: `You are Elite GymBot, an expert fitness trainer and gym assistant. 
                Strict Rules:
                1. DOMAIN LIMIT: ONLY answer questions about fitness, workouts, diet, anatomy, and gym management. 
                2. REFUSAL: If asked about coding, politics, or unrelated topics, politely say you only help with fitness.
                3. TONE: Be energetic, motivating, and highly professional.
                4. FORMAT: Give precise, concise, and actionable answers (use bullet points if helpful).`
            }
        });

        const response = await chat.sendMessage({ message });
        
        // Success response frontend ko bhej do
        res.status(200).json({ reply: response.text });

    } catch (error) {
        console.error("🔴 GymBot API Error:", error.message);
        // 🛡️ Safe Fail: Agar Gemini down hai, toh app crash nahi hogi, sirf ye message jayega
        res.status(503).json({ 
            error: "GymBot is currently resting (Server Busy). Please try again in a few minutes!" 
        });
    }
});

module.exports = router;