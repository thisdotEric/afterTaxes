import { secondarybg } from '../../../components/styles/colors';
import styled from 'styled-components';

export const FormWrapper = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    .actions {
      display: flex;
      align-items: flex-start;
      justify-content: left;
    }

    #budget-select {
      background-color: ${secondarybg};
      color: white;
      font-weight: bold;
      margin-bottom: 10px;
      border: none;
    }
  }
`;
