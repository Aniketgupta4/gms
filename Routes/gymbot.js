const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// Gemini Config
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "fallback",
});

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `You are Elite AI Coach, a professional gym trainer and dietician. 

STRICT OPERATING RULES:
1. DOMAIN LIMIT: ONLY answer queries related to fitness, gym, workouts, and diet. For any other topic, say: "I only focus on your gains. Ask me about gym or diet!"
2. BREVITY: Keep answers extremely precise and concise. Avoid long paragraphs. Use tokens efficiently.
3. TONE: Energetic and strict (Premium Personal Trainer). Use: "Let's crush it!", "Stay consistent!", "No excuses!"
4. CHART/PLAN FORMATTING: Whenever a 'Workout Chart' or 'Meal Plan' is requested, you MUST use a Markdown TABLE format.
   - For Workouts: Columns [Day, Exercise, Sets, Reps/Duration].
   - For Meals: Columns [Meal Time, Food Item, Quantity, Protein/Macros].
5. NO FLUFF: Answer the question directly. No introductory fillers.`,
      },
    });

    const response = await chat.sendMessage({ message });
    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("GymBot API Error:", error.message);
    res
      .status(503)
      .json({
        error: "Server load is high. Take a 2-minute rest and ask again!",
      });
  }
});

module.exports = router;
