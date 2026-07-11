import ai from "../config/gemini.js";
import { buildCompatibilityPrompt } from "../prompts/compatibility.prompt.js";
import { calculateFallbackScore } from "./fallback.service.js";

export const generateCompatibility = async (
    tenant,
    listing
) => {
    const prompt = buildCompatibilityPrompt(
        tenant,
        listing
    );

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
        });

        const text = response.text.trim();

        return JSON.parse(text);
    } catch (error) {

        return calculateFallbackScore(
            tenant,
            listing
        );
    }
};