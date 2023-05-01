const { MongoClient } = require('mongodb');

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
      res.status(200).json(data?.solution);
    } else {
      res.status(404).json('No data found');
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
