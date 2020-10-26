import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    color: #000000;
    background: #fafafa;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-size: 1.6rem;
    font-family: 'Roboto Slab', serif;
  }

  button {
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      transform: scale(0.6);
      opacity: 0.3;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
