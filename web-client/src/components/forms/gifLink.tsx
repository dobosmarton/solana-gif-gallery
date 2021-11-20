import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../buttons/button';

export const GifLink: React.FunctionComponent = () => {
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
      <Button type="submit" onClick={() => ({})}>
        Submit
      </Button>
    </form>
  );
};
