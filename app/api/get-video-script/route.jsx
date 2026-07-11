import { getInteraction } from "@/configs/genAi";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const provider = req.headers.get('x-ai-provider') || 'gemini';
        const apiKey = req.headers.get('x-ai-key');

        console.log(`Prompt received from frontend. Provider: ${provider.toUpperCase()}`);

        let parsedData = null;

        if (provider === 'openai') {
            if (!apiKey) {
                throw new Error("OpenAI API key is missing. Please configure it in Waffle Studio settings.");
            }

            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a creative short video script writer. Output a JSON object matching this schema: { \"scenes\": [ { \"imagePrompt\": \"string\", \"ContentText\": \"string\" } ] }. Do not include markdown formatting, backticks, or other text outside the JSON."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                response_format: { type: "json_object" }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            const content = response.data?.choices?.[0]?.message?.content;
            if (!content) throw new Error("No script generated from OpenAI API");
            parsedData = JSON.parse(content);

        } else if (provider === 'anthropic') {
            if (!apiKey) {
                throw new Error("Anthropic API key is missing. Please configure it in Waffle Studio settings.");
            }

            const response = await axios.post('https://api.anthropic.com/v1/messages', {
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 4096,
                system: "You are a creative short video script writer. Output only a raw JSON object matching this schema: { \"scenes\": [ { \"imagePrompt\": \"string\", \"ContentText\": \"string\" } ] }. Do not include markdown formatting, backticks, or explanation. Output only raw JSON.",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            }, {
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                }
            });

            const content = response.data?.content?.[0]?.text;
            if (!content) throw new Error("No script generated from Anthropic API");
            
            // Clean markdown wrappers if returned (sometimes Claude includes ```json ... ``` despite system prompt)
            let cleanedContent = content.trim();
            if (cleanedContent.startsWith('```')) {
                cleanedContent = cleanedContent.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
            }
            parsedData = JSON.parse(cleanedContent);

        } else {
            // Default to Gemini
            const result = await getInteraction(prompt, apiKey);
            const jsonText = result.text;
            console.log("Raw JSON text from Gemini:", jsonText);
            parsedData = JSON.parse(jsonText);
        }

        return NextResponse.json({ result: parsedData });

    } catch (e) {
        console.error("API Route Error Catch:", e.response?.data || e.message);
        const errMsg = e.response?.data?.error?.message || e.message || "Failed to process video script";
        return NextResponse.json(
            { Error: errMsg }, 
            { status: e.status || 500 }
        );
    }
}
