const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function Aigemini(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Generate a short caption for this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
        you generate single caption for the image . 
        Your caption should be short 20 wordes and concise.
        you use hashtag and emojis in the caption .
        generate caption in tapori language .
        `,
    },
  });
  return response.text;
}

module.exports = Aigemini;
