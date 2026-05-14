import { GoogleGenAI } from '@google/genai';

export const evaluateProfile = async (req, res) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { technicalSkills, resumeText, communicationAnswer, portfolioLinks } = req.body;

        const prompt = `
        You are an expert technical recruiter and interviewer. Evaluate the following candidate profile for Interview Readiness.
        
        Provide a structured JSON response exactly matching this format:
        {
          "overallScore": <number between 0 and 100>,
          "categories": {
            "technical": {
              "score": <number between 0 and 100>,
              "feedback": "<short paragraph of feedback>",
              "improvementPlan": ["<actionable item 1>", "<actionable item 2>"]
            },
            "resume": {
              "score": <number between 0 and 100>,
              "feedback": "<short paragraph of feedback>",
              "improvementPlan": ["<actionable item 1>", "<actionable item 2>"]
            },
            "communication": {
              "score": <number between 0 and 100>,
              "feedback": "<short paragraph of feedback>",
              "improvementPlan": ["<actionable item 1>", "<actionable item 2>"]
            },
            "portfolio": {
              "score": <number between 0 and 100>,
              "feedback": "<short paragraph of feedback>",
              "improvementPlan": ["<actionable item 1>", "<actionable item 2>"]
            }
          },
          "overallFeedback": "<A short summarizing paragraph of their overall readiness>"
        }

        CANDIDATE DATA:
        ---
        Technical Skills: ${technicalSkills || 'Not provided'}
        Resume Text: ${resumeText || 'Not provided'}
        Communication Sample Answer: ${communicationAnswer || 'Not provided'}
        Portfolio Links: ${portfolioLinks || 'Not provided'}
        ---
        
        Ensure your response is valid JSON, without any markdown formatting blocks like \`\`\`json.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
            }
        });

        const textResponse = response.text;
        const evaluationData = JSON.parse(textResponse);

        res.status(200).json(evaluationData);
    } catch (error) {
        console.error("Error evaluating profile:", error);
        res.status(500).json({ error: "Failed to evaluate profile. Please try again later." });
    }
};
