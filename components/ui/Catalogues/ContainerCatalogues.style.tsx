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

  /* Fondos para cada carta */
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

  /* Efecto hover en escritorio */
  .main:hover #c1 {
    transform: translateX(-30px) rotate(-10deg);
  }
  .main:hover #c2 {
    transform: translateX(-10px) rotate(-5deg);
  }
  .main:hover #c3 {
    transform: translateX(10px) rotate(5deg);
  }
  .main:hover #c4 {
    transform: translateX(30px) rotate(10deg);
  }

  /* Ajustes para pantallas tipo tablet */
  @media (max-width: 1024px) {
    .main {
      width: 16rem;
      height: 20rem;
    }
    #c1 {
      transform: translateX(-200px);
    }
    #c2 {
      transform: translateX(-100px);
    }
    #c3 {
      transform: translateX(100px);
    }
    #c4 {
      transform: translateX(200px);
    }
  }

  /* Ajustes para dispositivos móviles */
  @media (max-width: 768px) {
    .main {
      width: 14rem;
      height: 18rem;
    }
    /* En móviles, al no existir hover se aplican transformaciones por defecto */
    #c1 {
      transform: translateX(-15px) rotate(-10deg);
    }
    #c2 {
      transform: translateX(-5px) rotate(-5deg);
    }
    #c3 {
      transform: translateX(5px) rotate(5deg);
    }
    #c4 {
      transform: translateX(15px) rotate(10deg);
    }
  }

  @media (max-width: 480px) {
    .main {
      width: 12rem;
      height: 16rem;
    }
    #c1 {
      transform: translateX(-10px) rotate(-10deg);
    }
    #c2 {
      transform: translateX(-5px) rotate(-5deg);
    }
    #c3 {
      transform: translateX(5px) rotate(5deg);
    }
    #c4 {
      transform: translateX(10px) rotate(10deg);
    }
  }
`;
