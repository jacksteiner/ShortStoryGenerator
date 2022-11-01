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
    pool.query('SELECT * FROM "generation" ORDER BY "created_at" DESC;').then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in get story', error);
        res.sendStatus(500);
    })
});

router.get('/favorite', (req, res) => {
    // GET route code here
      pool.query('SELECT * FROM "generation" WHERE "favorite" = true ORDER BY "created_at" DESC;').then((results) => {
          res.send(results.rows);
      }).catch((error) => {
          console.log('Error in get story', error);
          res.sendStatus(500);
      })
  });

router.put('/favorite/:id', (req, res) => {
    const queryText = `UPDATE "generation" SET "favorite" = NOT "favorite" WHERE "id" = $1`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

router.get('/:promptName', async (req, res) => {
    const prompt = req.params.promptName
    console.log('in get promptName', prompt)
    try {
        // these are stories generated using the online demo because i ran out of tokens :(
        let story = 'No stories found'
        if (prompt === 'Alien'){
            story = `I was just driving home from work when I saw something strange in the sky. I got out of my car to get a closer look, and then I saw it: an alien spacecraft.`
        } else
         // Demo this one
        if (prompt === 'Moon'){
            story === `I can hear them howling at the moon. I hope they don't find me.`
        } else
        // Demo this one
        if (prompt === 'Ocean'){
            story = 'I love going to the beach and watching the waves crash against the shore. But sometimes, if I stare at the water for too long, I see things moving underneath the surface. Things with too many tentacles and eyes.'
        } else
        if (prompt === 'Lake'){
            story = `I can see my reflection in the lake, but it's not my face that's staring back at me.`
        } else
        if (prompt === 'Mars' ){
            story = `I was the first human to walk on Mars. Then I saw the footprints of something that was definitely not human.`
        } else
        if (prompt === 'Fox'){
            story = `I heard a noise in the bushes, thinking it was a fox. As I got closer, I realized it was something much worse.`
        } else
        if (prompt === 'Box'){
            story = `I went up into the attic to find a box I've never seen before. I slowly opened it and saw pair of eyes staring back at me.`
        } else
        if (prompt === 'Dog'){
            story = 'I woke up hearing scratching at the door. I looked to my side and our dog was sitting next to me.'
        } else
        // Demo this one
        if (prompt === 'Cat'){
            story = 'My cat was staring at something on the ceiling. I looked up and saw a dark moving shadow.'
        } else 
        if (prompt === 'Yarn'){
            story = 'While working on a new knitting project, I misplaced my skein of yarn. After searching for it for a few minutes, I found it behind the couch...crawling with moths.'
        } else {
            const responseFromOpenAI = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Topic:${prompt}\nTwo-Sentence Horror Story:`,
                temperature: 0.8,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
            });
            
            if (responseFromOpenAI.data.choices.length>0){
                story = responseFromOpenAI.data.choices[0].text
            } 
            console.log(responseFromOpenAI, 'response from openAI')
        }
        console.log('story', story);
        const queryText = `INSERT INTO "generation" ("prompt", "user_id", "story")
        VALUES ($1, $2, $3) returning "id";`
        // console.log('choices', choices);
        const result = await pool.query(queryText, [prompt, req.user.id, story])
        res.send({id:result.rows[0].id, prompt, user_id: req.user.id, story:story});

    } catch (e) {
        
        console.log('Error in promptNameGet', e);
        res.sendStatus(500);
    }
});

// router.put(`/favorite/:id`, (req, res) => {
//     console.log(req.params);

// })



/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;