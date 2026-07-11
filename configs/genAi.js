import { GoogleGenAI } from '@google/genai';

const tools = [{ googleSearch: {} }];

const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 4096,
    topP: 0.95,
    responseMimeType: "application/json",
    responseSchema: {
        type: "OBJECT",
        properties: {
            scenes: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        imagePrompt: { type: "STRING" },
                        ContentText: { type: "STRING" }
                    },
                    required: ["imagePrompt", "ContentText"]
                }
            }
        },
        required: ["scenes"]
    }
};

// Helper to get AI Client
function getAiClient(userKey) {
    const key = userKey || process.env['GEMINI_API_KEY'];
    if (!key) {
        throw new Error("Gemini API key is missing. Please configure it in Waffle Studio settings.");
    }
    return new GoogleGenAI({ apiKey: key });
}

// Retry handler for rate limit spikes
async function generateWithRetry(ai, modelName, promptText, retries = 3, delay = 3000) {
    try {
        return await ai.models.generateContent({
            model: modelName,
            contents: promptText,
            config: generationConfig,
            tools: tools
        });
    } catch (error) {
        if (error.status === 429 && retries > 0) {
            console.warn(`Rate limited (429). Retrying in ${delay / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return generateWithRetry(ai, modelName, promptText, retries - 1, delay * 2);
        }
        throw error;
    }
}

// Exported dynamic execution function
export async function getInteraction(userPrompt, userKey) {
    if (!userPrompt || userPrompt.trim() === '') {
        throw new Error("Prompt cannot be empty");
    }

    const ai = getAiClient(userKey);
    return await generateWithRetry(ai, 'gemini-2.5-flash', userPrompt);
}
