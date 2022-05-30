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

export const BudgetHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${secondarybg};

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
  }
`;
