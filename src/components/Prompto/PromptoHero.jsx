import React, { useEffect, useState, useRef } from "react";
import Section from "../Section";
import Heading from "../Heading";

const PromptoHero = () => {
    const [dailyImage, setDailyImage] = useState("");
    const [dailyPrompt, setDailyPrompt] = useState("");
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [challengeComplete, setChallengeComplete] = useState(false);

    const inputRef = useRef(null);
    const MAX_ATTEMPTS = 5; // Maximum attempts allowed

    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Fetch the daily image and prompt from the backend
    useEffect(() => {
        fetch("http://localhost:3001/api/daily-image")
            .then((res) => res.json())
            .then((data) => {
                setDailyImage(data.image);
                setDailyPrompt(data.prompt.toUpperCase());

                // Load from localStorage or initialize state
                const savedRevealedLetters = JSON.parse(
                    localStorage.getItem("revealedLetters") || "[]"
                );
                const savedAttempts = JSON.parse(localStorage.getItem("attempts") || "0");

                if (savedRevealedLetters.length === data.prompt.length) {
                    setRevealedLetters(savedRevealedLetters);
                } else {
                    setRevealedLetters(new Array(data.prompt.length).fill(false));
                }

                setAttempts(savedAttempts);
            })
            .catch((err) => console.error("Error fetching daily image:", err));
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (dailyPrompt) {
            localStorage.setItem("revealedLetters", JSON.stringify(revealedLetters));
            localStorage.setItem("attempts", JSON.stringify(attempts));
        }
    }, [revealedLetters, attempts, dailyPrompt]);

    const handleSubmitGuess = () => {
        if (!guess.trim()) return; // Prevent empty submissions

        fetch("http://localhost:3001/api/submit-guess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "testUser123",
                guess: guess.toUpperCase(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFeedback(data);

                // Update attempts used
                if (data.remainingAttempts !== undefined) {
                    setAttempts(MAX_ATTEMPTS - data.remainingAttempts);
                }

                // Handle correct guesses or end of attempts
                if (data.correct || data.remainingAttempts === 0) {
                    setChallengeComplete(true);
                }

                // Update revealed letters for matched words
                if (data.correct) {
                    setRevealedLetters(new Array(dailyPrompt.length).fill(true));
                } else if (data.matchedWords) {
                    const updatedRevealedLetters = [...revealedLetters];
                    const matchedWordsSet = new Set(
                        data.matchedWords.map((word) => word.toUpperCase())
                    );

                    let charIndex = 0;
                    dailyPrompt.split(" ").forEach((word) => {
                        if (matchedWordsSet.has(word)) {
                            for (let i = 0; i < word.length; i++) {
                                updatedRevealedLetters[charIndex + i] = true;
                            }
                        }
                        charIndex += word.length + 1; // Account for the space
                    });

                    setRevealedLetters(updatedRevealedLetters);
                }

                setGuess(""); // Clear the input box after submission
            })
            .catch((err) => console.error("Error submitting guess:", err));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (inputRef.current) inputRef.current.focus();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmitGuess();
        }
    };

    const renderLetterBoxes = () => {
        return (
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-8">
                {dailyPrompt.split("").map((letter, index) => {
                    if (letter === " ") {
                        return (
                            <div
                                key={index}
                                className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                            ></div> // Spacer for spaces
                        );
                    }
                    return (
                        <div
                            key={index}
                            className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sm sm:text-base lg:text-lg bg-black text-white flex justify-center items-center rounded-md mx-1 ${
                                revealedLetters[index]
                                    ? "border-2 border-green-400"
                                    : "border-2 border-white"
                            }`}
                        >
                            {revealedLetters[index] ? letter : ""}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderAttemptsBar = () => {
        const filledBars = attempts;
        const emptyBars = MAX_ATTEMPTS - attempts;

        return (
            <div className="flex items-center justify-center mt-4">
                {[...Array(filledBars)].map((_, i) => (
                    <div
                        key={`filled-${i}`}
                        className="w-6 h-6 bg-green-400 rounded-full mx-1"
                    ></div>
                ))}
                {[...Array(emptyBars)].map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="w-6 h-6 bg-gray-300 rounded-full mx-1"
                    ></div>
                ))}
            </div>
        );
    };

    return (
        <Section id="PromptoHero">
            <div className="container relative text-center">
                <Heading title="Today's Image" tag={getTodayDate()} />
                {renderLetterBoxes()}
                <div className="relative mx-auto mb-8 w-full max-w-xs sm:max-w-sm lg:max-w-md">
                    {dailyImage ? (
                        <img
                            src={dailyImage}
                            alt="Daily AI Challenge"
                            className="rounded-lg shadow-lg w-full object-contain"
                        />
                    ) : (
                        <p>Loading today's challenge...</p>
                    )}
                </div>
                <div className="flex flex-col items-center gap-4">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Enter your guess"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-3/4 max-w-md p-2 border rounded-md"
                        disabled={challengeComplete}
                    />
                    <button
                        onClick={handleSubmitGuess}
                        className="px-4 py-2 bg-color-1 text-white rounded-md shadow-md hover:bg-color-2"
                        disabled={challengeComplete}
                    >
                        Submit Guess
                    </button>
                </div>
                {renderAttemptsBar()}
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
