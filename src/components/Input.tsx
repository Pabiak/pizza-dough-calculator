import React from "react";

interface IInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  name: string;
  value?: string;
}

const Input = ({ onChange, label, placeholder, name, value }: IInputProps) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-2 justify-center">
      <span
        id="label"
        className="text-[var(--text)] tracking-normal leading-none text-base"
      >
        {label}
      </span>
      <input
        value={value}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        aria-placeholder={placeholder}
        aria-label={label}
        aria-labelledby="label"
        className="w-full border-1 border-solid border-[var(--border)] bg-[var(--background)] text-[var(--text)] rounded-lg px-2 py-2 placeholder:text-[var(--placeholder)] focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors duration-200 ease-in-out"
      />
    </label>
  );
};

export default Input;
