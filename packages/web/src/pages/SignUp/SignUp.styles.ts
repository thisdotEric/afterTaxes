import { green, primarybg } from '../../components/styles/colors';
import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  background-color: ${primarybg};
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

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
