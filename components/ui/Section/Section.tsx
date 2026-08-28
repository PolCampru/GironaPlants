"use client";

import styled, { css } from "styled-components";

/**
 * One vertical rhythm for the whole site: 96px between sections on desktop,
 * 64px below 768px. Sections used to each invent their own padding and
 * margin-bottom, so the gaps between them ranged from 0 to 11rem.
 */
const Section = styled.section<{ $tight?: boolean; $first?: boolean }>`
  ${({ theme, $tight, $first }) => css`
    padding-top: ${$first ? "0" : $tight ? theme.space.sectionSm : theme.space.section};

    @media (max-width: 768px) {
      padding-top: ${$first ? "0" : theme.space.sectionSm};
    }
  `}
`;

export default Section;
