import styled from "styled-components";

export const OfferCardWrapper = styled.div`
  width: 100%;
  height: 15rem;

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
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 0.25rem;
      }

      .attributes {
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
      }

      .text {
        margin-top: 1rem;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
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
`;
