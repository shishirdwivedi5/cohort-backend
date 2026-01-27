const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function Aimain(data) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: data,
    config: {
      systemInstruction: "You are a ai  give me short and clear ans based my quenstion .",
    },
  });
 return response.text;
}

module.exports =  Aimain;