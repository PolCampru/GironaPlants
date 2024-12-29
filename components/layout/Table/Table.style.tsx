import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  margin: 6px 0px 0px;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
  height: 72vh;

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
        background: #f9fafb;
        height: 60px;
        padding: 0px 0px 0px 20px;
        text-align: left;
        font-size: 15px;

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
      border-bottom: 1px solid #eee;
      &:last-of-type {
        border-bottom: none;
      }
      td {
        padding: 0px 0px 0px 20px;
        height: 60px;
        font-size: 15px;
        &:last-of-type {
          width: 180px;
        }
      }

      transition: 0.2s;
      input {
        opacity: 0%;
      }
      &:hover {
        &:not(:last-of-type) {
          cursor: pointer;
          background: rgba(81, 142, 248, 0.1);
          svg {
            color: #3758f9;
          }
          input {
            opacity: 100%;
          }
        }
      }
      input[type="checkbox"]:checked {
        opacity: 100%;
      }
    }

    .rowSelected {
      background: rgba(81, 142, 248, 0.1);
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
      .observer {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export { TableWrapper };
