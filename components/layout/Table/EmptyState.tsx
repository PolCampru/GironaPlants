import { styled } from "styled-components";

const EmptyStateWrapper = styled.div`
  position: absolute;
  top: 30%;
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

    span {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.brandGreen};
    }
  }

  .icon-container {
    width: 40%;
  }

  .icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

function EmptyState({
  emptyStateFunction,
}: {
  emptyStateFunction?: () => void;
}) {
  let language = "es";
  if (typeof window !== "undefined") {
    const url = window.location.href;
    if (url.includes("/en")) {
      language = "en";
    } else if (url.includes("/ca")) {
      language = "ca";
    } else if (url.includes("/fr")) {
      language = "fr";
    }
  }
  return (
    <EmptyStateWrapper className="empty-state-container">
      <img src="/images/products/noResults.png" alt="no Products" />
      {language === "en" ? (
        <>
          <h3>No results found</h3>
          <p>
            Add what you need <span onClick={emptyStateFunction}>here</span>
          </p>
        </>
      ) : language === "ca" ? (
        <>
          <h3>No s'han trobat resultats</h3>
          <p>
            Afegeix el que necessitis{" "}
            <span onClick={emptyStateFunction}>aquí</span>
          </p>
        </>
      ) : language === "fr" ? (
        <>
          <h3>Aucun résultat trouvé</h3>
          <p>
            Ajoutez ce dont vous avez besoin{" "}
            <span onClick={emptyStateFunction}>ici</span>
          </p>
        </>
      ) : (
        <>
          <h3>No se han encontrado resultados</h3>
          <p>
            Añade lo que necesitas{" "}
            <span onClick={emptyStateFunction}>aquí</span>
          </p>
        </>
      )}
    </EmptyStateWrapper>
  );
}

export default EmptyState;
