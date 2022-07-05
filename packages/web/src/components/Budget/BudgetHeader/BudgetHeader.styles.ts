import { green, secondarybg } from '../../styles/colors';
import styled from 'styled-components';

export const BudgetHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${secondarybg};

  #budget {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #total-budget {
    color: white;
    font-weight: bold;

    span {
      font-size: 16px;
      font-weight: bold;
      color: ${green};

      span {
        font-size: 15px;
      }
    }
  }
`;

export const BudgetText = styled.p`
  color: white;
  font-weight: bold;

  span {
    font-size: 16px;
    font-weight: bold;
    color: ${green};

    span {
      font-size: 15px;
    }
  }
`;
