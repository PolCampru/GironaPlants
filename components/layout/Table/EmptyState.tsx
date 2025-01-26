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
          <p>Please try another search.</p>
        </>
      ) : language === "ca" ? (
        <>
          <h3>No s'han trobat resultats</h3>
          <p>Si us plau, intenta una altra cerca.</p>
        </>
      ) : language === "fr" ? (
        <>
          <h3>Aucun résultat trouvé</h3>
          <p>Veuillez essayer une autre recherche.</p>
        </>
      ) : (
        <>
          <h3>No se han encontrado resultados</h3>
          <p>Por favor, realiza otra búsqueda.</p>
        </>
      )}
    </EmptyStateWrapper>
  );
}

export default EmptyState;
