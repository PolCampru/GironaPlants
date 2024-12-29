import styled from "styled-components";
import theme from "@/lib/theme";

const AddToCartWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  border-radius: 100%;
  background-color: ${theme.colors.hoverGreen};

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${theme.colors.brandGreen};
    color: ${theme.colors.white};
    transform: scale(1.5);

    img {
      filter: invert(1) brightness(10);
      stroke-width: 10px;
    }
  }
`;

const AddToCart = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddToCartWrapper onClick={onClick}>
      <img
        src="/images/plus.svg"
        alt="plus"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </AddToCartWrapper>
  );
};

export default AddToCart;
