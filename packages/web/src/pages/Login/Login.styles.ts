import styled from 'styled-components';
import {
  green,
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
  margin-top: 10px;

  p {
    color: ${white};
    margin-left: 10px;
    font-size: 12px;
  }
`;

export const AccountActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;

  .account-action {
    background: none;
    font-weight: normal;

    &:hover {
      text-decoration: underline;
      font-weight: bold;
      color: ${green};
    }
  }
`;
