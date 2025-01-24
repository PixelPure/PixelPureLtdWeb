import React, { useEffect, useState } from "react";

const PromptoHeroTemp = () => {
    const [dailyImage, setDailyImage] = useState(null);
    const [dailyPrompt, setDailyPrompt] = useState("");

    useEffect(() => {
        // Fetch the daily image and prompt from the backend
        fetch("http://localhost:3001/api/daily-image")
            .then((res) => res.json())
            .then((data) => {
                setDailyImage(data.image);
                setDailyPrompt(data.prompt);
            })
            .catch((err) => console.error("Error fetching daily image:", err));
    }, []);

    return (
        <div className="prompto-page">
            <h1>Today's Challenge</h1>
            {dailyImage ? (
                <>
                    <img
                        src={dailyImage}
                        alt="Daily AI Challenge"
                        className="daily-image"
                    />
                    <p>Try to guess the 5-word prompt!</p>
                </>
            ) : (
                <p>Loading today's challenge...</p>
            )}
        </div>
    );
};

export default PromptoHeroTemp;