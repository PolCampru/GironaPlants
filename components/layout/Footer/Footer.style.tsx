import styled from "styled-components";

export const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  overflow: hidden;
  flex-direction: column;
  z-index: 20;
`;

export const Logo = styled.div`
  width: 8rem;
  object-fit: contain;
  z-index: 20;
  cursor: pointer;
`;

export const FooterImage = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  object-fit: contain;
  height: 100%;
  cursor: pointer;
`;
