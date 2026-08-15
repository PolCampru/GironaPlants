import styled from "styled-components";

export const ContactWrapper = styled.section`
  position: relative;
  width: 100%;
  margin: 0 auto 6rem;
  padding: 3rem 3.5rem;

  background-color: ${({ theme }) => theme.colors.moss};
  border-radius: 1.25rem;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: -8rem;
    right: -8rem;
    width: 24rem;
    height: 24rem;
    border-radius: 50%;
    background-color: rgba(17, 139, 80, 0.35);
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem 2rem;
    margin-bottom: 3rem;
  }
`;

export const ContainerText = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.white};

  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.85);
    max-width: 34rem;
  }

  @media (max-width: 1024px) {
    h2 {
      font-size: 1.85rem;
    }
  }
`;

export const ContactMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-top: 1rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
    font-weight: 600;

    svg {
      color: ${({ theme }) => theme.colors.lime};
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ContainerAction = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;
