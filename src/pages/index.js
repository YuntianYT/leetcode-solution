import Image from 'next/image';
import { useState } from 'react';
import LeetCode from '../../public/assets/LeetCode.png';
import Head from 'next/head';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
export default function Home() {
  const [number, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState('');
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVisible(true);
    const response = await fetch(
      `/api/leetcode?number=${number}&language=${language}`
    );
    const data = await response.json();
    setData(data.solution);
    console.log(data);
  };

  return (
    <div>
      <div className='flex h-screen flex-col justify-center px-6 py-12 lg:px-8'>
        <Head>
          <title>Leetcode Solution</title>
          <meta
            name='description'
            content='Leetcode solution with GPT-3.5-turbo'
          />
          <link rel='icon' href='/fav.webp' />
        </Head>
        <div className='mx-auto w-full max-w-sm mb-10'>
          <Image src={LeetCode} width='640' height='64' alt='/' />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='h-full flex flex-wrap items-center justify-center'>
              <div className='my-3 sm:my-0'>
                <label className='font-bold text-lg text-gray-700'>
                  Question number:
                </label>
                <input
                  type='number'
                  id='inputNumber'
                  name='inputNumber'
                  min='1'
                  max='2500'
                  required
                  className='rounded-md w-16 mx-2 p-1.5 bg-slate-100 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={number}
                  onChange={handleTitleChange}
                />
              </div>
              <div className='mx-5'>
                <label className='font-bold text-lg text-gray-700'>
                  Language:
                </label>
                <select
                  className='rounded-md mx-2 p-2 text-gray-900 shadow-lg bg-slate-100'
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value='JavaScript'>JavaScript</option>
                  <option value='Python'>Python</option>
                  <option value='Python3'>Python3</option>
                  <option value='java'>Java</option>
                  <option value='C++'>C++</option>
                  <option value='C'>C</option>
                  <option value='C#'>C#</option>
                  <option value='Ruby'>Ruby</option>
                  <option value='Swift'>Swift</option>
                  <option value='Go'>Go</option>
                  <option value='Scala'>Scala</option>
                  <option value='Kotlin'>Kotlin</option>
                  <option value='Rust'>Rust</option>
                  <option value='PHP'>PHP</option>
                  <option value='Typescript'>Typescript</option>
                  <option value='Racket'>Racket</option>
                  <option value='Erlang'>Erlang</option>
                  <option value='Elixir'>Elixir</option>
                  <option value='Dart'>Dart</option>
                </select>
              </div>
              <div>
                <input
                  className='shadow-md p-2 shadow-gray-400 rounded-lg text-gray-700 font-bold cursor-pointer'
                  type='submit'
                  value='Search'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          isVisible
            ? 'fixed left-0 top-0 w-full h-screen bg-black/50'
            : 'hidden'
        }
      >
        <div className='flex justify-center items-center w-full h-full'>
          <div className='w-3/5 h-4/5 bg-slate-100 rounded-xl shadow-lg'>
            <div class='flex justify-end'>
              <button
                onClick={() => {
                  setIsVisible(false);
                }}
                class='rounded-full shadow-gray-400 bg-slate-100 w-8 h-8'
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className='flex justify-center w-full h-full'>
              <div className='p-3 mt-2 bg-slate-200 shadow-lg rounded-lg overflow-auto'>
                <ReactMarkdown>{data}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
