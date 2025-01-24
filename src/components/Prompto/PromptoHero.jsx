import React, { useEffect, useState } from "react";
import { curve } from "../../assets";
import Section from "../Section";

const PromptoHero = () => {
    const [dailyImage, setDailyImage] = useState("");
    const [dailyPrompt, setDailyPrompt] = useState("");

    // Fetch the daily image and prompt from the backend
    useEffect(() => {
        fetch("http://localhost:3001/api/daily-image") // Use full backend URL
            .then((res) => res.json())
            .then((data) => {
                setDailyImage(data.image); // Set the fetched image URL
                setDailyPrompt(data.prompt); // Set the prompt (optional, for future use)
            })
            .catch((err) => console.error("Error fetching daily image:", err));
    }, []);

    return (
        <Section id="PromptoHero">
            <div className="container relative text-center">
                {/* Title Section */}
                <div className="relative z-1 max-w-[62rem] mx-auto mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <h1 className="h1 mb-6">
                        <span className="inline-block relative">
                            $PROMPTO
                            <img
                                src={curve}
                                className="absolute top-full left-0 w-full xl:-mt-2"
                                width={624}
                                height={28}
                                alt="Curve"
                            />
                        </span>
                    </h1>
                </div>

                {/* Daily Image Section */}
                <div className="relative mx-auto max-w-sm mb-8">
                    {dailyImage ? (
                        <img
                            src={dailyImage} // Dynamically set the image URL
                            alt="Daily AI Challenge"
                            className="rounded-lg shadow-lg"
                        />
                    ) : (
                        <p>Loading today's challenge...</p>
                    )}
                </div>

                {/* Guessing Blocks */}
                <div className="flex flex-col items-center gap-4 mt-20">
                    <div className="w-2/4 h-10 bg-black rounded-md"></div>
                    <div className="w-2/4 h-10 bg-black rounded-md"></div>
                    <div className="w-2/4 h-10 bg-black rounded-md"></div>
                    <div className="w-2/4 h-10 bg-black rounded-md"></div>
                    <div className="w-2/4 h-10 bg-black rounded-md"></div>
                </div>
            </div>
        </Section>
    );
};

export default PromptoHero;
