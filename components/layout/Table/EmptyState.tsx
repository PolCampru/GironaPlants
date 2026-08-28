"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 3.5rem 1.5rem 4rem;
  text-align: center;

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.625rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.muted};
    max-width: 26rem;
  }

  button {
    margin-top: 0.75rem;

    display: inline-flex;
    align-items: center;
    height: ${({ theme }) => theme.control.height};
    padding-inline: 1.25rem;

    background: ${({ theme }) => theme.colors.brandGreen};
    border: 0;
    border-radius: ${({ theme }) => theme.radii.pill};
    color: ${({ theme }) => theme.colors.white};

    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.greenDeep};
    }
  }
`;

/**
 * Copy comes from i18n. It used to sniff the locale out of
 * `window.location.href` and branch on it in JSX, which rendered the Spanish
 * strings on the server for every locale and then swapped them on the client.
 */
function EmptyState({
  emptyStateFunction,
}: {
  emptyStateFunction?: () => void;
}) {
  const { t } = useTranslation(["products"]);
  const copy = t("products.emptyState", { returnObjects: true }) as {
    title?: string;
    text?: string;
    button?: string;
  };

  return (
    <EmptyStateWrapper>
      <Image
        src="/images/products/noResults.png"
        alt=""
        width={220}
        height={220}
        style={{ width: "100%", maxWidth: "13.75rem", height: "auto" }}
        sizes="220px"
      />
      <h3>{copy?.title}</h3>
      <p>{copy?.text}</p>
      {emptyStateFunction && copy?.button && (
        <button type="button" onClick={emptyStateFunction}>
          {copy.button}
        </button>
      )}
    </EmptyStateWrapper>
  );
}

export default EmptyState;
