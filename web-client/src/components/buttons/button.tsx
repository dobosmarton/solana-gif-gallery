import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FunctionComponent<Props> = ({ children, type, disabled, onClick }) => {
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      onClick={onClick}>
      {children}
    </button>
  );
};
