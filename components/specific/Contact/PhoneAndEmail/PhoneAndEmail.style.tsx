import styled from "styled-components";

export const PhoneAndEmailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 2.4rem;

  .container-contact {
    cursor: pointer;

    .container-img-title {
      display: flex;
      align-items: center;
      gap: 3%;

      img {
        width: 1.0625rem;
        height: 1.0625rem;
      }
    }

    h2 {
      color: ${(props) => props.theme.colors.dark};
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
    }

    p {
      font-size: 1.1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;
