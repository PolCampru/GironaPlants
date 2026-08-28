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

export const CloseButton = styled.button`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 1.75rem;
  height: 1.75rem;

  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.danger};
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
      color: ${(props) => props.theme.colors.gray};
      text-decoration: line-through;
      font-size: 1rem;
      font-weight: 500;
      text-decoration-line: strikethrough;
      text-transform: uppercase;
    }
  }
`;
