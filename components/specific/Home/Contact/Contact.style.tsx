import styled from "styled-components";

export const ContactWrapper = styled.section`
  width: 80%;
  height: 12.875rem;
  padding: 0 0 0 3rem;
  margin: 0 auto;
  margin-bottom: 6rem;
  background-color: ${({ theme }) => theme.colors.moss};

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.625rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    padding: 1rem;
    margin-bottom: 3rem;
  }
`;

export const ContainerText = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.white};

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
    text-align: center;

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.2rem;
    }
  }
`;

export const ContainerButton = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0.625rem;

  .background {
    position: absolute;
    width: 500px;
    height: 500px;
    left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.brandGreen};
    border-radius: 100%;
    transition: all 0.3s;
  }

  .link {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.3s;

    img {
      height: 1rem;
      filter: invert(1) brightness(100);
    }
  }

  &:hover {
    .background {
      left: 0;
    }
    .link {
      gap: 0.8rem;
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 1rem;

    .background {
      width: 100%;
      height: 300px;
      left: 0;
    }

    .link {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    .background {
      width: 100%;
      height: 250px;
      left: 0;
    }
    .link {
      font-size: 1.2rem;
    }
  }
`;
