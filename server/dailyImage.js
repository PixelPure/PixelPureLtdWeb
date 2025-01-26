import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import schedule from "node-schedule";
import cors from "cors";
import fs from "fs";
import guessRouter from "./guessEvaluation.js"; // Assuming you modularized the guess logic

dotenv.config();

// Validate API Key
if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not defined. Check your .env file.");
    process.exit(1);
}

const app = express();
const PORT = 3001;

// Enable CORS to allow communication with your frontend
app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from your frontend
    })
);

// Add JSON body parsing middleware
app.use(express.json());

// Path to store the cached daily image and prompt
const CACHE_FILE = "./dailyImageCache.json";

// In-memory storage for the daily image and prompt
global.dailyImage = null;
global.dailyPrompt = null;

// Array of prompts
const prompts = [
    "A futuristic cityscape at sunset",
    "A serene forest with glowing mushrooms",
    "A robot playing chess in space",
    "A flying goat in a cyberpunk city",
    "An astronaut walking on a rainbow bridge",
];

// Function to load cached data
const loadCache = () => {
    console.log("Attempting to load cache...");
    if (fs.existsSync(CACHE_FILE)) {
        console.log("Cache file exists. Reading data...");
        const data = fs.readFileSync(CACHE_FILE, "utf-8");
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.image && parsedData.prompt) {
                global.dailyImage = parsedData.image;
                global.dailyPrompt = parsedData.prompt;
                console.log("Cache successfully loaded:", parsedData);
            } else {
                console.log("Cache file is empty or incomplete. Skipping load.");
            }
        } catch (err) {
            console.error("Error parsing cache file:", err);
        }
    } else {
        console.log("No cache file found. A new image will be generated.");
    }
};

// Function to save cached data
const saveCache = () => {
    const data = {
        image: global.dailyImage,
        prompt: global.dailyPrompt,
    };
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(data), "utf-8");
        console.log(`Cache saved successfully to ${CACHE_FILE}`);
    } catch (err) {
        console.error("Error saving cache:", err);
    }
};

// Function to generate an image using OpenAI's DALL·E API
const generateDailyImage = async () => {
    console.log("Starting image generation process...");

    // Check if an image and prompt already exist
    if (global.dailyImage && global.dailyPrompt) {
        console.log("Daily image and prompt already exist. Skipping generation.");
        return;
    }

    try {
        console.log("Selecting a random prompt...");
        global.dailyPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        console.log(`Selected prompt: "${global.dailyPrompt}"`);

        console.log("Preparing to call OpenAI DALL·E API...");
        const requestBody = {
            prompt: global.dailyPrompt,
            n: 1,
            size: "512x512",
        };
        console.log("Request Body:", JSON.stringify(requestBody, null, 2));

        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        console.log("Received response from OpenAI API.");
        if (response && response.data && response.data.data && response.data.data[0]) {
            global.dailyImage = response.data.data[0].url;
            console.log(`Generated new daily image URL: ${global.dailyImage}`);

            console.log("Saving generated data to cache...");
            saveCache();
        } else {
            console.error("Unexpected response structure from OpenAI API:", response.data);
        }
    } catch (error) {
        console.error("Error during image generation process.");
        console.error("Error Message:", error.message);

        if (error.response) {
            console.error("Error Response Data:", JSON.stringify(error.response.data, null, 2));
            console.error("HTTP Status Code:", error.response.status);
        } else {
            console.error("No response received. Possible network or configuration issue.");
        }
    }
};



// Load cached data on server startup and only generate a new image if cache is missing
console.log("Loading cache on server startup...");
loadCache();
if (!global.dailyImage || !global.dailyPrompt) {
    console.log("No cached data found. Generating a new image...");
    generateDailyImage();
} else {
    console.log("Cached data found. Using existing daily image and prompt.");
}

// Schedule the image generation to run daily at midnight
schedule.scheduleJob("0 0 * * *", () => {
    console.log("Midnight reached. Generating new image...");
    global.dailyImage = null;
    global.dailyPrompt = null;
    generateDailyImage();
});

// API endpoint to serve the daily image and prompt
app.get("/api/daily-image", (req, res) => {
    console.log("Received request for daily image...");
    if (!global.dailyImage || !global.dailyPrompt) {
        console.error("Daily image not available yet.");
        return res.status(500).json({ error: "Daily image not available yet." });
    }
    console.log("Responding with daily image and prompt.");
    res.json({ image: global.dailyImage, prompt: global.dailyPrompt });
});

// Mount the guessing system
app.use("/api", guessRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
