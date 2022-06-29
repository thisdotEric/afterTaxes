import styled from 'styled-components';
import {
  secondarybg,
  green,
  primarybg,
  red,
} from '../../components/styles/colors';

export const TotalExpenses = styled.p`
  color: grey;

  span {
    font-weight: bold;
    color: ${green};
  }
`;

export const ExpensesLegends = styled.div`
  padding-top: 10px;
  color: white;
  font-style: italic;

  span {
    color: ${red};
  }

  #legend-description {
    color: grey;
  }
`;

export const ExpensesPageWrapper = styled.div`
  .input-modal {
    background-color: greenyellow;
    color: black;
  }

  #expense-amt {
    color: ${green};
  }

  #action-btn {
    background: none;

    &:hover {
      background-color: ${primarybg};
    }
  }

  #total-expenses {
    color: white;
    font-size: 13px;

    span {
      font-weight: bold;
      background-color: ${secondarybg};
      padding: 5px 10px;
      border-radius: 10px;
    }
  }
`;
