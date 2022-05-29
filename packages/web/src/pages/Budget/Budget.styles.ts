import styled from 'styled-components';
import { green, red, secondarybg } from '../../components/styles/colors';

export const BudgetWrapper = styled.div`
  #budget-history-title {
    color: ${green};
  }

  .item-title {
    color: ${green};
    font-weight: bold;
  }

  .item {
    color: ${green};
    font-weight: bold;
  }

  #total-budget {
    color: white;

    span {
      color: white;
    }
  }
`;

export const BudgetCards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  #actions {
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; */

    .action-btn {
      background: none;
      text-align: left;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        stroke-width: 2px;
      }
    }

    #edit {
      color: ${green};
    }

    #delete {
      color: ${red};
    }
  }

  #budget-card {
    background-color: ${secondarybg};
    margin: 10px;
    border: none;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    #name {
      width: 200px;
      color: white;
      font-weight: bold;
      padding-bottom: 10px;
    }

    #amount {
      color: ${green};
      font-weight: bold;
    }
  }
`;
