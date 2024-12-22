import styled from "styled-components";

export const WaveGroup = styled.div`
  position: relative;

  .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: ${(props) => `1px solid ${props.theme.colors.gray}`};
    background: transparent;
  }

  .input:focus {
    outline: none;
  }

  .label {
    color: ${(props) => props.theme.colors.gray};
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
  }

  .label-char {
    transition: 0.1s ease all;
    transition-delay: calc(var(--index) * 0.01s);
    font-size: 0.875rem;
  }

  .input:focus ~ .label .label-char,
  .input:not(:placeholder-shown) ~ .label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: ${(props) => props.theme.colors.brandGreen};
  }

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: ${(props) => props.theme.colors.brandGreen};
    transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  .input:focus ~ .bar:before,
  .input:focus ~ .bar:after {
    width: 50%;
  }

  &.has-error .input {
    border-bottom: 1px solid red;
  }
  &.has-error .label .label-char {
    color: ${(props) => props.theme.colors.orange};
  }

  textarea.input {
    resize: vertical;
    min-height: 7rem;
    max-height: 15rem;
    padding: 10px 10px 10px 5px;
  }
`;

export const ContainerError = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: ${(props) => props.theme.colors.orange};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
