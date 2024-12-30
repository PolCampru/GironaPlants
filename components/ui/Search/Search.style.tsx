import styled from "styled-components";

export const StyledWrapper = styled.div`
  .form button {
    border: none;
    background: none;
    color: #8b8ba7;
  }
  .form {
    --timing: 0.3s;
    --width-of-input: 100%;
    --height-of-input: 2rem;
    --border-height: 2px;
    --input-bg: ${(props) => props.theme.colors.hoverGreen};
    --border-color: ${(props) => props.theme.colors.brandGreen};
    --border-radius: 30px;
    --after-border-radius: 1px;
    position: relative;
    width: var(--width-of-input);
    height: var(--height-of-input);
    display: flex;
    align-items: center;
    padding-inline: 0.8em;
    border-radius: var(--border-radius);
    transition: border-radius 0.5s ease;
    background: var(--input-bg, ${(props) => props.theme.colors.hoverGreen});
  }
  .input {
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
  }
  .form:before {
    content: "";
    position: absolute;
    background: var(--border-color);
    transform: scaleX(0);
    transform-origin: center;
    width: 100%;
    height: var(--border-height);
    left: 0;
    bottom: 0;
    border-radius: 1px;
    transition: transform var(--timing) ease;
  }
  /* Hover on Input */
  .form:focus-within {
    border-radius: var(--after-border-radius);
  }

  input:focus {
    outline: none;
  }
  .form:focus-within:before {
    transform: scale(1);
  }

  .reset {
    border: none;
    background: none;
    opacity: 0;
    visibility: hidden;
  }
  input:not(:placeholder-shown) ~ .reset {
    opacity: 1;
    visibility: visible;
  }
  .form svg {
    width: 17px;
    margin-top: 3px;
  }
`;
