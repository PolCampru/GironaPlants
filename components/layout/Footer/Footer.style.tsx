import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  padding: 5rem 0rem 2.5rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  background: ${(props) =>
    `linear-gradient(179deg, ${props.theme.colors.white} 20.22%, ${props.theme.colors.brandGreen} 313.93%)`};

  p {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
  position: relative;
`;

export const ContactContainer = styled.div`
  width: 94%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.25rem;
`;

export const Logo = styled.div`
  width: 7rem;
  padding-bottom: 1.75rem;
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
    p {
      text-decoration: underline;
    }
  }
`;

export const ImageFooter = styled.div`
  position: absolute;
  bottom: 4.8rem;
  right: 5rem;
  width: 10rem;
`;
