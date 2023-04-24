import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [number, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/api/leetcode?number=${number}&language=${language}`
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className='flex h-screen flex-col justify-center px-6 py-12 lg:px-8'>
      <div class='mx-auto w-full max-w-sm mb-10'>
        <Image
          src='/../public/assets/LeetCode.png'
          width='640'
          height='64'
          alt='/'
        />
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
                <option
                  value='JavaScript'
                  className='h-40 overflow-scroll scrollbar-thumb-gray-300 scrollbar-track-gray-100'
                >
                  JavaScript
                </option>
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
  );
}
