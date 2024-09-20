const functions = require("@google-cloud/functions-framework");
const { VertexAI } = require("@google-cloud/vertexai");

async function textGen(prompt) {
  const vertexAI = new VertexAI({
    project: "helper-project-malalane",
    location: "us-central1",
  });

  // schema for control generated output
  const response_schema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        review: { type: "STRING" },
        "sentiment-score": {
          type: "INTEGER",
          description: "between 0 and 5",
        },
        "sentiment-class": { type: "STRING" },
      },
    },
  };

  const generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: response_schema,
    },
  });

  const result = await generativeModel.generateContent(prompt);
  const contentResponse = await result.response;
  const text = contentResponse.candidates[0].content.parts[0].text;

  return text;
}

functions.http("geminiHttp", async (req, res) => {
  const input = req.body.prompt;
  console.log("input: %s", input);
  const result_text = await textGen(
    `Infer the sentiment of the following customer service reviews. Make sure the : ${input}`
  );
  res.send(`Gemini Response: ${result_text}`);
});
