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

  #allocated-budgets-actions {
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 12px;

    p {
      color: white;
      font-weight: bold;
    }

    #create-new-budget {
      border: none;
      background: none;
      color: white;
      font-weight: normal;

      &:hover {
        color: ${green};
        font-weight: bold;
        text-decoration: underline;
      }
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

    .hidden {
      opacity: 0;
    }
  }

  #budget-card {
    background-color: ${secondarybg};
    margin: 10px;
    border: none;
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

    #remaining {
      font-weight: bold;
      padding-top: 3px;
      color: gray;
    }

    .none {
      text-decoration: line-through;
    }
  }
`;
