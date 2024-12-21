import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 0.4rem;
  flex-direction: column;

  .subtitle {
    color: ${(props) => props.theme.colors.dark};

    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.00875rem;

    margin-bottom: 1rem;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  height: 100%;

  overflow-y: auto;

  .submit {
    display: flex;
    width: 100%;
    height: 3.125rem;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    border: none;
    border-radius: 6.25rem;
    background-color: ${(props) => props.theme.colors.brandGreen};
    color: ${(props) => props.theme.colors.white};

    cursor: pointer;

    transition: background-color 0.3s, color 0.3s, transform 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colors.hoverGreen2};
      color: ${(props) => props.theme.colors.dark};
    }

    &:active {
      transform: scale(0.98);
    }

    color: ${(props) => props.theme.colors.white};
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
