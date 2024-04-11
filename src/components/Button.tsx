import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button: React.FC<Props> = ({ title, onChange, className }) => {
  return (
    <button
      onChange={onChange}
      className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${className}`}
    >
      {title}
    </button>
  );
};
