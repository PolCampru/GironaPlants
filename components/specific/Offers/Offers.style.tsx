import styled from "styled-components";

export const OffersWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 8rem;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  .container-offers {
    width: 100%;
    margin-top: 2.8rem;
    padding-bottom: 1rem;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(700px, 1fr));
    gap: 1rem;

    scroll-behavior: smooth;
    overflow-y: auto;
  }
`;
