import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

const tools = [
    {
        type: 'google_search',
    },
];

const generationConfig = {
    temperature: 1,
    max_output_tokens: 65536,
    top_p: 0.95,
    thinking_level: 'high',
};


    export const interaction = await ai.interactions.create({
        model: 'gemini-3.5-flash',
        input: '',
        tools: tools,
        generation_config: generationConfig,
        response_format: {
            type: 'object'
        }
    });


