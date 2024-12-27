"use client";
import { StyledWrapper } from "./ContainerCatalogues.style";

const ContainerCatalogs = () => {
  return (
    <StyledWrapper>
      <div className="main">
        <div
          className="card"
          id="c1"
          onClick={() => console.log("Catàleg de gramínies")}
        />
        <div
          className="card"
          id="c2"
          onClick={() => console.log("Catàleg de producció")}
        />
        <div
          className="card"
          id="c3"
          onClick={() => console.log("Catàleg de disponibles")}
        />
        <div
          className="card"
          id="c4"
          onClick={() => console.log("Catàleg general")}
        />
      </div>
    </StyledWrapper>
  );
};

export default ContainerCatalogs;
