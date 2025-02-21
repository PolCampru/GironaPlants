import styled from "styled-components";

export const OfferCardWrapper = styled.div`
  width: 100%;
  height: 15rem;
  min-width: 50rem;
  flex: 1;

  position: relative;

  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1%;

  border-radius: 0.625rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.15);

  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.25);
    background-color: ${(props) => props.theme.colors.creamLight};
  }

  .container-discount {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;

    height: 1.5rem;
    padding: 0.25rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.25rem;
    background: ${(props) => props.theme.colors.discountRed};
    color: ${(props) => props.theme.colors.white};

    z-index: 1;
  }

  .container-img-text {
    width: 70%;
    height: 100%;
    padding: 1.5rem 1.5rem 1.5rem 4.5rem;

    display: flex;
    justify-content: start;
    align-items: start;
    gap: 3rem;

    .container-text {
      width: 100%;
      height: 100%;

      .description {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      .attributes {
        font-size: 0.75rem;
        font-weight: 300;
      }

      .text {
        margin-top: 1rem;
        font-size: 0.875rem;
        font-weight: 400;
      }
    }
  }

  .container-price {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: end;
    padding: 1.5rem 1.5rem 1.5rem 0;
    gap: 0.5rem;

    .new-price {
      color: ${(props) => props.theme.colors.discountRed};
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .old-price {
      color: ${(props) => props.theme.colors.grey};
      text-decoration: line-through;
      font-size: 1rem;
      font-weight: 500;
      text-decoration-line: strikethrough;
      text-transform: uppercase;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 25rem;
    min-width: 100%;
    margin: 0.25rem;

    .container-img-text {
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      padding: 1.5rem;

      .container-text {
        height: auto;
        .attributes {
          font-size: 0.625rem;
        }

        .text {
          margin-top: 0.5rem;
          font-size: 0.75rem;
        }
      }
    }

    .container-price {
      padding: 1.5rem;
      width: 100%;
      height: auto;
    }
  }
`;
