import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button } from '../buttons/button';

type Props = {
  onSubmit: (inputValue: string) => Promise<void>;
};

export const GifLink: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendGif = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      console.log('Gif link:', inputRef.current?.value);
      onSubmit(inputRef.current.value);
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
          ref={inputRef}
          name="link"
          id="link"
          className="w-64 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter gif link!"
        />
      </div>
      <Button type="submit" onClick={() => ({})}>
        Submit
      </Button>
    </form>
  );
};
