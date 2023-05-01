const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db('leetcode');
    const collection = db.collection('solutions');
    await collection.insertOne(req.body);
    await client.close();
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(`Error with request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      },
    });
  }
}
