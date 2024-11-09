import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBM4Qwn6AgLcA_CjUNiztNWjIC9YccjK4w';
const MODEL_NAME = 'gemini-pro';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export async function generateTravelResponse(prompt: string): Promise<string> {
    try {
        const result = await model.generateContent(`
            Act as a knowledgeable travel assistant. Provide helpful, concise advice about travel destinations, 
            planning, and recommendations. Current query: ${prompt}
        `);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
}