"use client";

import styled from "styled-components";

export const TitleWrapper = styled.h1`
  display: flex;
  padding: 0.5rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 6.25rem;
  background-color: ${(props) => props.theme.colors.creamLight};

  color: ${(props) => props.theme.colors.brandGreen};

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
