"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import {
  SearchForm,
  SearchInput,
  SearchSubmit,
  Suggestion,
  SuggestionRow,
  SuggestionsLabel,
} from "./PlantSearch.style";

type PlantSearchProps = {
  locale: string;
  placeholder: string;
  submitLabel: string;
  suggestions?: string[];
  suggestionsLabel?: string;
};

/**
 * Availability search. There are ~1,500 references in the CMS and the only
 * way in used to be a filter sidebar three clicks deep, so the search comes
 * to the visitor instead.
 */
const PlantSearch = ({
  locale,
  placeholder,
  submitLabel,
  suggestions = [],
  suggestionsLabel,
}: PlantSearchProps) => {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const go = (value: string) => {
    const trimmed = value.trim();
    router.push(
      trimmed
        ? `/${locale}/products?search=${encodeURIComponent(trimmed)}`
        : `/${locale}/products`
    );
  };

  return (
    <>
      <SearchForm
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          go(term);
        }}
      >
        <FiSearch aria-hidden="true" />
        <SearchInput
          type="search"
          name="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
        />
        <SearchSubmit type="submit">{submitLabel}</SearchSubmit>
      </SearchForm>

      {suggestions.length > 0 && (
        <SuggestionRow>
          {suggestionsLabel && (
            <SuggestionsLabel>{suggestionsLabel}</SuggestionsLabel>
          )}
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion}
              type="button"
              onClick={() => go(suggestion)}
            >
              {suggestion}
            </Suggestion>
          ))}
        </SuggestionRow>
      )}
    </>
  );
};

export default PlantSearch;
