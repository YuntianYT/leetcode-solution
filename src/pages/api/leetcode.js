import { Configuration, OpenAIApi } from 'openai';
const { MongoClient } = require('mongodb');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { number, language } = req.body;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db('leetcode');
    const collection = db.collection('solutions');
    const data = await collection.findOne({
      number,
      language,
    });
    if (data) {
      res.status(200).json(data.solution);
    } else {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Leetcode question ${number}, show me the ${language} solution code`,
          },
        ],
        temperature: 0,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
      });
      const newRecord = {
        number: number,
        language,
        solution: response.data.choices[0].message.content,
      };
      await collection.insertOne(newRecord);
      res.status(200).json(newRecord.solution);
    }
    await client.close();
  } catch (error) {
    console.error(`Error with request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      },
    });
  }
}
