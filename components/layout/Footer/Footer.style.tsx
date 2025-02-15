import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  padding: 5rem 0 2.5rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  background: ${(props) =>
    `linear-gradient(179deg, ${props.theme.colors.white} 20.22%, ${props.theme.colors.brandGreen} 313.93%)`};
  position: relative;

  p {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem 1rem;
    gap: 1rem;
  }
`;

export const ContactContainer = styled.div`
  width: 94%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const Logo = styled.div`
  width: 7rem;
  padding-bottom: 1.75rem;

  @media (max-width: 768px) {
    width: 5rem;
    padding-bottom: 1.5rem;
  }
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.colors.brandGreen};
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;

  p {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  div {
    display: flex;
    gap: 1rem;

    p {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;

    div {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export const ImageFooter = styled.div`
  position: absolute;
  bottom: 4.8rem;
  right: 5rem;
  width: 10rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
