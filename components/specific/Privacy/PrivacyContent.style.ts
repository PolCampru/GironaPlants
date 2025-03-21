import styled from "styled-components";

export const PrivacyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  margin-top: 4rem;
`;

export const PrivacyTitle = styled.h1`
  font-size: 1rem;
  color: #667;
  margin-bottom: 1rem;
  text-align: center;
`;

export const PrivacySection = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  color: #667;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionContent = styled.p`
  font-size: 0.8rem;
  line-height: 1.8;
  color: #667;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.6;
  }
`;
