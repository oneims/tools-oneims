// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Write me an SEO optimized meta title and meta description for https://www.oneims.com/`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
      res.status(200).json({
        success: true,
        data: response.data.choices[0].text,
        message: "OpenAI generated an answer",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.response ? error.response.data : "There was an issue on the server",
      });
    }
  } else {
  }
}
