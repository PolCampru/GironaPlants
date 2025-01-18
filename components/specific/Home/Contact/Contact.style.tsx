import styled from "styled-components";

export const ContactWrapper = styled.section`
  width: 80%;
  height: 12.875rem;
  padding: 0rem 0rem 0rem 3rem;
  margin: 0 auto;
  margin-bottom: 6rem;

  background-color: ${({ theme }) => theme.colors.moss};

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 0.625rem;
`;

export const ContainerText = styled.div`
  width: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  color: ${({ theme }) => theme.colors.white};

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
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
    width: 400px;
    height: 400px;

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
    justify-content: start;
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
`;
