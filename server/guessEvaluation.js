import express from "express";

const router = express.Router();

// In-memory storage for user attempts
let userAttempts = {};

// Endpoint to handle guesses
router.post("/submit-guess", (req, res) => {
    const { userId, guess } = req.body;

    if (!global.dailyPrompt) {
        return res.status(500).json({ error: "Daily prompt not available yet." });
    }

    if (!userId || !guess) {
        return res.status(400).json({ error: "User ID and guess are required." });
    }

    // Initialize user attempts
    if (!userAttempts[userId]) {
        userAttempts[userId] = {
            attempts: 0,
            correct: false,
        };
    }

    const user = userAttempts[userId];

    if (user.correct) {
        return res.status(200).json({ message: "You've already guessed the prompt correctly!" });
    }

    if (user.attempts >= 5) {
        return res.status(403).json({ error: "Maximum attempts reached." });
    }

    // Increment attempts
    user.attempts += 1;

    // Evaluate the guess
    const promptWords = global.dailyPrompt.toLowerCase().split(" ");
    const guessWords = guess.toLowerCase().split(" ");
    const matchedWords = promptWords.filter((word) => guessWords.includes(word));

    if (matchedWords.length === promptWords.length) {
        user.correct = true;
        return res.status(200).json({
            message: "Correct! You've guessed the prompt.",
            correct: true,
            matchedWords,
        });
    }

    // Provide feedback
    const remainingAttempts = 5 - user.attempts;
    res.status(200).json({
        message: "Keep trying!",
        correct: false,
        matchedWords,
        remainingAttempts,
    });
});

export default router;
