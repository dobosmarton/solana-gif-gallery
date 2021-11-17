import { ChangeEvent, FormEvent, useState } from 'react';

export const GifLink = () => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };

  return (
    <form className="my-12 sm:flex sm:items-center" onSubmit={sendGif}>
      <div className="w-full sm:max-w-xs">
        <label htmlFor="link" className="sr-only">
          Gif link
        </label>
        <input
          name="link"
          id="link"
          className="w-64 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter gif link!"
          value={inputValue}
          onChange={onInputChange}
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
        Submit
      </button>
    </form>
  );
};
