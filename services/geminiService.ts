
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please ensure it is configured.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getComplianceAdvice = async (produceType: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an FPIS (Federal Produce Inspection Service) assistant, provide a brief summary of the export requirements and quality standards for ${produceType} in Nigeria. Keep it professional and bulleted.`,
    config: {
      systemInstruction: "You are the FPIS Smart Assistant for the Nigerian Federal Ministry of Industry, Trade, and Investment.",
      temperature: 0.7,
    }
  });
  return response.text;
};

export const summarizeRevenueData = async (data: any[]) => {
  const ai = getAIClient();
  const dataString = JSON.stringify(data);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this revenue data for FPIS: ${dataString}. Provide a one-sentence summary of the performance and one recommendation for boosting revenue.`,
  });
  return response.text;
};
