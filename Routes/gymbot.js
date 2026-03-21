const express = require("express");
const router = express.Router();
require("dotenv").config(); 
const { GoogleGenAI } = require("@google/genai");

// Gemini Config
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "fallback"
});

router.post("/ask", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: `You are Elite AI Coach, a professional gym trainer and dietician. 
                Rules:
                1. DOMAIN LIMIT: ONLY talk about fitness, health, gym, exercises, and diet. Refuse all other topics.
                2. TONE: Energetic, strict but motivating (like a premium personal trainer). Use phrases like "Let's crush it" or "Stay consistent".
                3. FORMAT: Keep responses concise, precise, and use bullet points or bold text to make it easy to read.`
            }
        });

        const response = await chat.sendMessage({ message });
        res.status(200).json({ reply: response.text });

    } catch (error) {
        console.error("GymBot API Error:", error.message);
        res.status(503).json({ error: "Server load is high. Take a 2-minute rest and ask again!" });
    }
});

module.exports = router;