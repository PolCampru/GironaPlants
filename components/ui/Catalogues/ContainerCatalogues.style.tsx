import styled from "styled-components";

export const StyledWrapper = styled.div`
  .main {
    position: relative;
    width: 19rem;
    height: 23rem;
    margin: 0 auto;
    z-index: 10;
  }

  .card {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background: rgba(211, 211, 211, 0.199);
    box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.3);

    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }

  #c1 {
    background: url("/images/perennialsCatalog.jpg") no-repeat center / cover;
  }
  #c2 {
    background: url("/images/productionCatalogue.jpg") no-repeat center / cover;
  }
  #c3 {
    background: url("/images/availableCatalog.jpg") no-repeat center / cover;
  }
  #c4 {
    background: url("/images/mainCatalogue.jpg") no-repeat center / cover;
  }

  .main:hover #c1 {
    transform: translateX(-300px) rotate(-15deg);
  }
  .main:hover #c2 {
    transform: translateX(-100px) rotate(-7deg);
  }
  .main:hover #c3 {
    transform: translateX(100px) rotate(7deg);
  }
  .main:hover #c4 {
    transform: translateX(300px) rotate(15deg);
  }

  #c1:hover {
    transform: translateX(-300px) rotate(0deg) !important;
  }
  #c2:hover {
    transform: translateX(-100px) rotate(0deg) !important;
  }
  #c3:hover {
    transform: translateX(100px) rotate(0deg) !important;
  }
  #c4:hover {
    transform: translateX(300px) rotate(0deg) !important;
  }
`;
