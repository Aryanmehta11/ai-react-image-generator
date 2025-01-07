import React, { useRef, useState } from "react";
import sample from "../Assets/sample.jpg";
import "./ImageGenerator.css";

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const inputRef = useRef(null);

    const imageGen = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            const data_array = data.data;
            setImage_url(data_array[0]?.url || "/");
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    return (
        <div className="ai-image-generator">
            <div className="header">
                AI Image <span>Generator</span>
            </div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? sample : image_url} alt="Generated AI" />
                </div>
            </div>
            <div className="searchBox">
                <input
                    type="text"
                    ref={inputRef}
                    className="search-input"
                    placeholder="Describe what you want"
                />
                <div className="generate-btn" onClick={imageGen}>
                    Generate
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;
