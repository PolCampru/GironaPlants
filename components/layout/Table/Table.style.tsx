import styled from "styled-components";
import { motion } from "framer-motion";

export const TableWrapper = styled(motion.div)`
  width: 100%;
  height: 55rem;
  margin: 0.375rem 0 0;
  box-shadow: 0 0.1875rem 0.5rem 0 rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  table {
    width: 100%;
    border-radius: 0.625rem;
    border-collapse: collapse;

    thead {
      border-radius: 0.625rem 0.625rem 0 0;

      th {
        background: ${(props) => props.theme.colors.creamLight};
        height: 2rem;
        padding: 0 0 0 1.25rem;
        text-align: left;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.5rem;
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
        padding: 0 0 0 1.25rem;
        height: 3.125rem;
        font-size: 1rem;
        border: 0.0625rem solid ${(props) => props.theme.colors.lightGray};
        cursor: pointer;

        &:nth-child(1) {
          width: 13rem;
        }

        &:nth-child(3) {
          width: 8.125rem;
        }
        &:nth-child(4) {
          width: 8.125rem;
        }
        &:nth-child(5) {
          width: 8.125rem;
        }
        &:nth-child(6) {
          width: 4.3125rem;
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
      height: 3.75rem;
      margin-top: 0.625rem;
      width: 100%;
      display: flex !important;
      justify-content: center;
      position: absolute;

      td {
        border: none;
      }

      .observer {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
`;
