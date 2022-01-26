import styled from 'styled-components';
import {
  lightgreen,
  primarybg,
  red,
  white,
} from '../../components/styles/colors';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: ${primarybg};
  height: 100vh;
  width: 100%;

  form {
    width: 320px;
  }

  form input[type='checkbox'] {
    cursor: pointer;
  }

  // afterTaxes text
  p {
    font-size: 48px;
    text-align: center;
    color: ${white};
    margin: 20px;

    span {
      color: ${lightgreen};
    }
  }

  #login-btn {
    text-align: center;
    width: 100%;
  }

  #github {
    margin-top: 100px;
  }

  #errMsg {
    font-size: 13px;
    text-align: left;
    color: ${red};
  }
`;

export const RememberMe = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  margin-left: 10px;

  p {
    color: ${white};
    margin-left: 10px;
    font-size: 12px;
  }
`;
