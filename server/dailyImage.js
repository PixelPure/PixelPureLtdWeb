import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import schedule from "node-schedule";
import cors from "cors";

dotenv.config();

// Validate API Key
if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not defined. Check your .env file.");
    process.exit(1);
}

const app = express();
const PORT = 3001; // Backend server port

// Enable CORS to allow communication with your frontend
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
}));

// In-memory storage for the daily image and prompt
let dailyImage = null;
let dailyPrompt = null;

// Array of prompts
const prompts = [
    "A futuristic cityscape at sunset",
    "A serene forest with glowing mushrooms",
    "A robot playing chess in space",
    "A flying goat in a cyberpunk city",
    "An astronaut walking on a rainbow bridge",
];

// Function to generate an image using OpenAI's DALL·E API
const generateDailyImage = async () => {
    try {
        // Select a random prompt
        dailyPrompt = prompts[Math.floor(Math.random() * prompts.length)];

        // Make the API call
        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: dailyPrompt,
                n: 1,
                size: "512x512",
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        // Store the daily image URL
        dailyImage = response.data.data[0].url;
        console.log(`Generated new daily image: ${dailyImage}`);
    } catch (error) {
        console.error("Error generating daily image:", error.message);
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
    }
};

// Schedule the image generation to run daily at midnight
schedule.scheduleJob("0 0 * * *", () => {
    generateDailyImage();
});

// Generate the first image on server startup
generateDailyImage();

// API endpoint to serve the daily image and prompt
app.get("/api/daily-image", (req, res) => {
    if (!dailyImage || !dailyPrompt) {
        return res.status(500).json({ error: "Daily image not available yet." });
    }
    res.json({ image: dailyImage, prompt: dailyPrompt });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
