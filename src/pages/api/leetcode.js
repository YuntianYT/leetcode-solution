import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { number, language } = req.query;

  try {
    console.log(number, language);
    res.status(200).json({ result: 'success' });
    // const response = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: `Leetcode question ${number}, show me the ${language} solution code`,
    //     },
    //   ],
    //   temperature: 0,
    //   max_tokens: 2048,
    //   top_p: 1,
    //   frequency_penalty: 0,
    // });
    // res.status(200).json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error(`Error with request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      },
    });
  }
}
