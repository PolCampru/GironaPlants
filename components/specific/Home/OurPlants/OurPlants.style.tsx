import styled from "styled-components";

export const OurPlantsWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 0;
  margin-bottom: 3rem;

  h2 {
    width: 40%;
    font-size: 2rem;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    h2 {
      width: 100%;
    }
  }
`;

export const PlantsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 0.75rem;
`;

export const PlantBox = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.creamLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #333;
`;
