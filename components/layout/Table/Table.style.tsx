import styled from "styled-components";
import { motion } from "framer-motion";

export const TableWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  margin: 6px 0px 0px;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  table {
    width: 100%;
    border-radius: 10px;
    border-collapse: collapse;

    thead {
      border-radius: 10px 10px 0px 0px;

      th {
        background: ${(props) => props.theme.colors.creamLight};
        height: 2rem;
        padding: 0px 0px 0px 20px;
        text-align: left;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.5rem;

        &:last-of-type {
          width: 180px;
        }
        &:first-of-type {
          width: 20px;
        }
      }
    }

    .header-table {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    tr {
      &:last-of-type {
        border-bottom: none;
      }

      &:hover {
        background-color: ${(props) => props.theme.colors.lightGray};
      }

      td {
        padding: 0px 0px 0px 20px;
        height: 3.125rem;
        font-size: 1rem;
        border: 1px solid ${(props) => props.theme.colors.lightGray};
        cursor: pointer;

        &:last-of-type {
          width: 180px;
        }
      }

      transition: 0.2s;
      input {
        opacity: 0%;
      }
    }

    tbody {
      position: relative;
    }

    .trigger {
      height: 60px;
      margin-top: 10px;
      width: 100%;
      display: flex !important;
      justify-content: center;
      position: absolute;

      td {
        border: none;
      }

      .observer {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
