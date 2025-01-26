import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import schedule from "node-schedule";
import cors from "cors";
import fs from "fs";
import crypto from "crypto";
import guessRouter from "./guessEvaluation.js"; // Assuming you modularized the guess logic
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = "./dailyImageCache.json";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY?.padEnd(32, "0"); // Use a 32-byte key from .env
if (!ENCRYPTION_KEY) {
    console.error("ENCRYPTION_KEY is not defined. Check your .env file.");
    process.exit(1);
}

// Utility: Encrypt a string
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
};

// Utility: Decrypt a string
const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(ENCRYPTION_KEY),
        Buffer.from(hash.iv, "hex")
    );
    let decrypted = decipher.update(hash.encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

// Load prompts securely from the .env file
const prompts = JSON.parse(process.env.PROMPTS || "[]");
if (!prompts.length) {
    console.error("No prompts found in .env. Please add valid JSON prompts to the PROMPTS key.");
    process.exit(1);
}

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
        origin: "http://localhost:5173", // Adjust origin as needed
    })
);

// Add JSON body parsing middleware
app.use(express.json());

// Serve static files
app.use("/static", express.static(path.join(__dirname, "static")));

// In-memory storage for the daily image and prompt
global.dailyImage = null;
global.dailyPrompt = null;

// Function to save cache
const saveCache = (data) => {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(data), "utf-8");
        console.log("Cache saved successfully.");
    } catch (err) {
        console.error("Error saving cache:", err);
    }
};

// Function to load cache
const loadCache = () => {
    if (fs.existsSync(CACHE_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
            global.dailyImage = data.image;
            global.dailyPrompt = decrypt(data.prompt);
            console.log("Cache loaded successfully.");
        } catch (err) {
            console.error("Error loading cache:", err);
        }
    } else {
        console.log("No cache file found.");
    }
};

// Function to download an image
const downloadImage = async (url, filePath) => {
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
};

// Function to generate the daily image
const generateDailyImage = async () => {
    try {
        console.log("Selecting a random prompt...");
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        const encryptedPrompt = encrypt(randomPrompt);

        console.log(`Selected prompt: "${randomPrompt}"`);

        console.log("Calling OpenAI DALL·E API...");
        const requestBody = {
            prompt: randomPrompt,
            n: 1,
            size: "512x512",
        };

        const response = await axios.post("https://api.openai.com/v1/images/generations", requestBody, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        });

        if (response?.data?.data[0]?.url) {
            const imageUrl = response.data.data[0].url;

            // Save image to local static folder
            const staticDir = path.join(__dirname, "static");
            if (!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir);
            }

            const localImagePath = path.join(staticDir, "dailyImage.png");
            console.log("Downloading image locally...");
            await downloadImage(imageUrl, localImagePath);

            global.dailyImage = `http://localhost:${PORT}/static/dailyImage.png`;
            global.dailyPrompt = randomPrompt;

            saveCache({ prompt: encryptedPrompt, image: global.dailyImage });
            console.log("Daily image and prompt generated successfully.");
        }
    } catch (error) {
        console.error("Error generating daily image:", error);
    }
};

// Load cached data on server startup
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
    if (!global.dailyImage || !global.dailyPrompt) {
        return res.status(500).json({ error: "Daily image not available yet." });
    }
    res.json({ image: global.dailyImage, prompt: global.dailyPrompt });
});

// Mount the guessing system
app.use("/api", guessRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
