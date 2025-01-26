import React, { useEffect, useState } from "react";
import { curve } from "../../assets";
import Section from "../Section";

const PromptoHero = () => {
    const [dailyImage, setDailyImage] = useState("");
    const [dailyPrompt, setDailyPrompt] = useState(""); // Optional for debugging
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [attempts, setAttempts] = useState(0);

    // Fetch the daily image and prompt from the backend
    useEffect(() => {
        fetch("http://localhost:3001/api/daily-image")
            .then((res) => res.json())
            .then((data) => {
                setDailyImage(data.image);
                setDailyPrompt(data.prompt); // Optional, remove in production
            })
            .catch((err) => console.error("Error fetching daily image:", err));
    }, []);

    const handleSubmitGuess = () => {
        fetch("http://localhost:3001/api/submit-guess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "testUser123", // Replace with dynamic user ID (e.g., wallet or session)
                guess,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFeedback(data);
                if (data.remainingAttempts !== undefined) {
                    setAttempts(5 - data.remainingAttempts);
                }
            })
            .catch((err) => console.error("Error submitting guess:", err));
    };

    return (
        <Section id="PromptoHero">
            <div className="container relative text-center">
                {/* Title Section */}
                <h1 className="h1 mb-6">$PROMPTO</h1>

                {/* Daily Image Section */}
                <div className="relative mx-auto max-w-sm mb-8">
                    {dailyImage ? (
                        <img
                            src={dailyImage}
                            alt="Daily AI Challenge"
                            className="rounded-lg shadow-lg"
                        />
                    ) : (
                        <p>Loading today's challenge...</p>
                    )}
                </div>

                {/* Guess Submission */}
                <div className="flex flex-col items-center gap-4">
                    <input
                        type="text"
                        placeholder="Enter your guess"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        className="w-2/4 p-2 border rounded-md"
                    />
                    <button
                        onClick={handleSubmitGuess}
                        className="px-4 py-2 bg-color-1 text-white rounded-md shadow-md hover:bg-color-2"
                    >
                        Submit Guess
                    </button>
                </div>

                {/* Feedback Section */}
                {feedback && (
                    <div className="mt-4 text-center">
                        <p>{feedback.message}</p>
                        {feedback.matchedWords && (
                            <p>Matched Words: {feedback.matchedWords.join(", ")}</p>
                        )}
                        {feedback.remainingAttempts !== undefined && (
                            <p>Attempts Used: {attempts}/5</p>
                        )}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default PromptoHero;
