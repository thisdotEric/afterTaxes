import styled from 'styled-components';
import { secondarybg } from '../../components/styles/colors';

export const ExpensesTableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background-color: ${secondarybg};
    border: none;
  }

  thead tr th {
    color: white;
    font-weight: bold;

    p {
      display: flex;
      align-items: flex-start;
      justify-content: left;
    }
  }

  tbody tr td {
    color: white;
    border-bottom-color: gray;
    font-weight: bold;
  }

  tbody tr {
    border-top: 0;
  }
`;
