const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
    pool.query('SELECT * FROM "generation";').then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in get story', error);
        res.sendStatus(500);
    })
});

router.get('/:promptName', async (req, res) => {
    const prompt = req.params.promptName
    console.log('in get promptName', prompt)
    try {
        const responseFromOpenAI = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Topic:${prompt}\nTwo-Sentence Horror Story:`,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        const queryText = `INSERT INTO "generation" ("prompt", "user_id", "story")
                            VALUES ($1, $2, $3);`
        let story = 'No stories found'
        if (responseFromOpenAI.data.choices.length>0){
            story = responseFromOpenAI.data.choices[0].text
        }
        // for testing only
        if (prompt === 'Dog'){
            story = 'I woke up hearing scratching at the door. I looked to my side and our dog was sitting next to me.'
        }
        if (prompt === 'Cat'){
            story = 'My cat was staring at something on the ceiling. I looked up and saw a dark moving shadow.'
        }
        console.log('story', story);
        // console.log('choices', choices);
        await pool.query(queryText, [prompt, req.user.id, story])
        console.log(responseFromOpenAI, 'response from openAI')
        res.send(responseFromOpenAI.data);

    } catch (e) {
        
        console.log('Error in promptNameGet', e);
        res.sendStatus(500);
    }
});



/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;