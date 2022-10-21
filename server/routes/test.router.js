const express = require('express');
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// GET example
// /api/openapi/
// someprompt may need to be urlencoded.
router.get('/', async (req, res) => {
    try {
        const responseFromOpenAI = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: "Topic: Breakfast\nTwo-Sentence Horror Story: He always stops crying when I pour the milk on his cereal. I just have to remember not to let him see his face on the carton.\n    \nTopic: Wind\nTwo-Sentence Horror Story:",
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        res.send(responseFromOpenAI);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// POST example (even though we are not technically adding to the DB)
// /api/openapi/
router.post('/', async (req, res) => {
    try {
        const { temperature, prompt } = req.body;
        const responseFromOpenAI = await openai.createCompletion({
            model: "text-davinci-002",
            // prompt: "Topic: Breakfast\nTwo-Sentence Horror Story: He always stops crying when I pour the milk on his cereal. I just have to remember not to let him see his face on the carton.\n    \nTopic: Wind\nTwo-Sentence Horror Story:",
            prompt,
            // temperature: 0.8,
            temperature,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        res.send(responseFromOpenAI);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;