import { styled } from "styled-components";

const EmptyStateWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin-top: 32px;
    margin-bottom: 8px;
    font-size: 24px;
  }
  p {
    margin: 0;
    font-size: 16px;
  }

  .icon-container {
    width: 40%;
  }

  .icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function EmptyState() {
  return (
    <EmptyStateWrapper className="empty-state-container">
      <h3>No se han encontrado resultados</h3>
      <p>Por favor, realiza otra búsqueda.</p>
    </EmptyStateWrapper>
  );
}

export default EmptyState;
