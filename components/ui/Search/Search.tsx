import React, { FormEvent, useState } from "react";
import { StyledWrapper } from "./Search.style";

interface SearchProps {
  placeholder: string;
  onSearch?: (value: string) => void;
}

const Search = ({ placeholder, onSearch }: SearchProps) => {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch?.(value);
  }

  function handleReset() {
    setValue("");
    onSearch?.("");
  }

  return (
    <StyledWrapper>
      <div className="form" onChange={handleSubmit}>
        <button type="submit">
          <svg
            width={17}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <input
          className="input"
          placeholder={placeholder}
          required
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          className="reset"
          type="button" // Important: don't trigger form submit
          onClick={handleReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

export default Search;
