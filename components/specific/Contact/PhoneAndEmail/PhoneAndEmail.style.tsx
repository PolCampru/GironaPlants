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
      font-weight: 600;
      line-height: 150%;
    }

    p {
      font-size: 1.1rem;
      font-weight: 500;
      line-height: normal;
    }
  }

  @media (max-width: 1024px) {
    gap: 2rem;

    .container-contact {
      .container-img-title {
        img {
          width: 1rem;
          height: 1rem;
        }
      }

      h2 {
        font-size: 0.95rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;

    .container-contact {
      .container-img-title {
        gap: 0.5rem;
        img {
          width: 0.9rem;
          height: 0.9rem;
        }
      }

      h2 {
        font-size: 0.9rem;
      }

      p {
        font-size: 0.9rem;
      }
    }
  }
`;
