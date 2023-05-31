const { MongoClient } = require('mongodb');
export default async function handler(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db('leetcode');
    const collection = db.collection('solutions');
    const data = await collection.find({}).toArray();
    res.status(200).json({ data });
    await client.close();
  } catch (error) {
    console.error(`Error with mongodb request: ${error}`);
    res.status(500).json({ message: 'Error with mongodb request' });
  }
}
