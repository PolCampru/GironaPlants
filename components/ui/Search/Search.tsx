"use client";

import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { ResetButton, SearchField, SearchInput } from "./Search.style";

interface SearchProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  clearLabel: string;
}

const Search = ({ placeholder, onChange, value, clearLabel }: SearchProps) => (
  <SearchField>
    <FiSearch aria-hidden="true" size={16} />
    {/* The old markup wrapped this in a form with a submit button and
        `required`, so an empty field showed the browser's :invalid styling
        before the user had typed anything. */}
    <SearchInput
      type="search"
      placeholder={placeholder}
      aria-label={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoComplete="off"
    />
    {value && (
      <ResetButton type="button" onClick={() => onChange("")} aria-label={clearLabel}>
        <FiX aria-hidden="true" size={14} strokeWidth={2.6} />
      </ResetButton>
    )}
  </SearchField>
);

export default Search;
