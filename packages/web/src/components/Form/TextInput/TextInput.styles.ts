import { green, secondarybg, white } from '../../../components/styles/colors';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  &:focus-within label {
    transform: translate(0, 5px) scale(0.8);
  }

  .filled {
    transform: translate(0, 5px) scale(0.8);
  }

  label {
    position: absolute;
    pointer-events: none;
    transform: translate(0, 15px) scale(1);
    transform-origin: top left;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    font-size: 13px;
    line-height: 1;
    left: 16px;
    color: ${white};
  }

  input {
    padding: 24px 16px 5px 16px;
    line-height: 1;
    outline: none;
    box-shadow: none;
    transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    background: ${secondarybg};
    color: ${white};
    border: none;
    font-size: 13px;
    width: 100%;
    font-weight: bold;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
  }

  :-ms-input-placeholder {
    color: rgb(213, 207, 207);
  }

  ::-ms-input-placeholder {
    color: rgb(213, 207, 207);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  #eye {
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
    color: ${green};
    height: 16px;
    width: 16px;
  }
`;
