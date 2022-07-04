import styled from 'styled-components';
import { green } from '../../../../components/styles/colors';

export const RemainingBudgetWrapper = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  #remaining-amount {
    font-weight: bold;
    color: ${green};
  }

  #remaining {
    font-style: italic;
    color: grey;
    font-size: 12px;
  }
`;
