import { OpenAIStream } from '@/utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { number, language } = await req.json();
    const stream = await OpenAIStream(number, language);
    return new Response(stream);
  } catch (error) {
    console.error(`Error with request: ${error.message}`);
    return new Response('Error', { status: 500 });
  }
}
