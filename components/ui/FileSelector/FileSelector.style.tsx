import styled from "styled-components";

export const FileSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-family: Arial, sans-serif;
  cursor: pointer;
  width: 100%;

  input {
    display: none;
  }

  .container-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: underline;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }

    label {
      cursor: pointer;
    }
  }

  .file-list {
    width: 100%;
    list-style-type: none;
    padding: 0;

    max-height: 120px;
    overflow-y: auto;
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 5px;
  }

  .file-item span {
    flex: 1;
  }

  .remove-button {
    background-color: ${(props) => props.theme.colors.orange};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;

    transition: background-color 0.3s;
  }

  .remove-button:hover {
    background-color: ${(props) => props.theme.colors.red};
  }
`;
