import axios from 'axios';
import mongodb from 'mongodb';

const { MongoClient } = require('mongodb');

const connectionString =
  'mongodb+srv://admin:UeFuklTUfClRLLv7@cluster0.g4y55.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);

export default async function handler(req, res) {
  const { title, language } = req.query;

  try {
    // Connect to MongoDB database
    await client.connect();
    const db = client.db('leetcode');
    const collection = db.collection('solutions');

    // Check if solution exists in database
    const query = { title, language };
    const solution = await collection.findOne(query);
    if (solution) {
      console.log('Solution found in database:', solution);
      res.status(200).json(solution);
    } else {
      // Call OpenAI
      const openaiApiKey =
        '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';
      const prompt = `Please write a ${language} function that solves the following LeetCode problem:\n\n${title}\n\n`;

      const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        data: {
          prompt,
          max_tokens: 1024,
          n: 1,
          stop: ['\n\n'],
        },
      });

      const answer = response.data.choices[0].text.trim();
      console.log('Solution retrieved from OpenAI API:', answer);

      // Save solution to database
      const solution = { title, language, answer };
      const result = await collection.insertOne(solution);

      res.status(200).json(solution);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    // Close MongoDB connection
    await client.close();
  }
}
