const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const url = req.body.url;
    const metaTitleSuffix = req.body.metaTitleSuffix;
    console.log(`HEY THERE!`, url, metaTitleSuffix);
    const prompt = `Write me a captivating meta title and meta description for ${url} ${
      metaTitleSuffix && metaTitleSuffix.length > 0
        ? `and end the meta title with ${metaTitleSuffix}`
        : ``
    }. Return these statements as a JSON Object with the structure {"metaTitle": String, "metaDescription": String}. Do not return any non-json text or numbering.`;
    console.log(`payload`, metaTitleSuffix);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
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
        message: "Success",
      });
      console.log(response.data.choices[0].text);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.response ? error.response.data : "There was an issue on the server",
      });
    }
  } else {
  }
}
