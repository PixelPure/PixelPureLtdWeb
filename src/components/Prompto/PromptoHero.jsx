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

    const inputRef = useRef(null);

    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        fetch("http://localhost:3001/api/daily-image")
            .then((res) => res.json())
            .then((data) => {
                setDailyImage(data.image);
                setDailyPrompt(data.prompt.toUpperCase());
                setRevealedLetters(new Array(data.prompt.length).fill(false));
            })
            .catch((err) => console.error("Error fetching daily image:", err));
    }, []);

    const handleSubmitGuess = () => {
        if (!guess.trim()) return;
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
                if (data.remainingAttempts !== undefined) {
                    setAttempts(5 - data.remainingAttempts);
                }

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
                        charIndex += word.length + 1; // Account for space
                    });

                    setRevealedLetters(updatedRevealedLetters);
                }
                setGuess("");
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
        const boxes = [];
        let charIndex = 0;

        dailyPrompt.split(" ").forEach((word, wordIndex) => {
            const wordBoxes = word.split("").map((letter, letterIndex) => {
                const isRevealed = revealedLetters[charIndex];
                const box = (
                    <div
                        key={`${wordIndex}-${letterIndex}`}
                        className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-sm sm:text-base lg:text-lg bg-black text-white flex justify-center items-center rounded-md mx-1 ${
                            isRevealed
                                ? "border-2 border-green-400"
                                : "border-2 border-white"
                        }`}
                    >
                        {isRevealed ? letter : ""}
                    </div>
                );
                charIndex++;
                return box;
            });

            boxes.push(
                <div key={`word-${wordIndex}`} className="flex">
                    {wordBoxes}
                </div>
            );

            // Add space between words
            if (wordIndex < dailyPrompt.split(" ").length - 1) {
                charIndex++; // Account for space in revealedLetters
                boxes.push(
                    <div
                        key={`space-${wordIndex}`}
                        className="w-4 h-6 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                    ></div>
                );
            }
        });

        return (
            <div className="flex flex-wrap justify-center gap-2">
                {boxes}
            </div>
        );
    };

    return (
        <Section id="PromptoHero">
            <div className="container relative text-center">
                <Heading title="Today's Challenge" tag={getTodayDate()} />
                {renderLetterBoxes()}
                <div className="relative mx-auto mb-8 w-full max-w-xs sm:max-w-sm lg:max-w-md mt-8">
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
                    />
                    <button
                        onClick={handleSubmitGuess}
                        className="px-4 py-2 bg-color-1 text-white rounded-md shadow-md hover:bg-color-2"
                    >
                        Submit Guess
                    </button>
                </div>
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
