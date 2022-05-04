import { secondarybg } from '../styles/colors';
import styled, { css } from 'styled-components';

export const LabelCss = css`
  color: white;
`;

export const InputCSS = css`
  background-color: ${secondarybg};
  border: none;
  caret-color: white;
  color: white;
  font-weight: bold;
  padding: 5px;
  font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
`;

export const InputWrapper = styled.div`
  #number-input {
    background-color: ${secondarybg};
    border: none;
    caret-color: white;
    color: white;
    font-weight: bold;
    padding: 5px;
    font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
  }

  .label {
    color: white;
  }
`;
