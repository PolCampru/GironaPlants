import styled from "styled-components";

export const BudgetItemWrapper = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  position: relative;
`;

export const CloseButton = styled.div`
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 2px;
  right: 2px;

  transition: transform 0.3s;

  cursor: pointer;

  &:hover {
    transform: rotate(90deg);
  }
`;

export const ContainerImgText = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 0.5rem;

  position: relative;

  .container-carrusel {
    width: 7rem;
    height: 7rem;

    .discount {
      position: absolute;
      top: 0;
      left: 0;

      background: ${({ theme }) => theme.colors.discountRed};
      color: ${({ theme }) => theme.colors.white};

      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem;

      border-radius: 0.25rem;
    }
  }

  .container-info {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0.5rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;

export const ContainerEnd = styled.div`
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 1rem;

  .container-price {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    gap: 0.2rem;

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
