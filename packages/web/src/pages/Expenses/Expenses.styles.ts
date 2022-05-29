import styled from 'styled-components';
import {
  secondarybg,
  green,
  red,
  primarybg,
  lightgreen,
} from '../../components/styles/colors';

export const ExpensesPageWrapper = styled.div`
  .input-modal {
    background-color: greenyellow;
    color: black;
  }
`;

export const TableWrapper = styled.div`
  hr {
    border: 0.5px solid gray;
    margin: 2px s0px;
  }

  .table-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 5px;

    #table-search {
      background: ${secondarybg};
      border: none;
      caret-color: white;
      color: white;
      height: 10px;
      font-size: 14px;

      &::placeholder {
        font-size: 12px;
      }
    }

    #add-expense {
      text-decoration: none;
      color: white;
      font-size: 12px;
      font-weight: bold;
      border: none;
      background: transparent;

      &:hover {
        text-decoration: underline;
        color: ${green};
      }
    }
  }

  #tbl-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;

    #pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        color: white;
        font-size: 13px;

        span {
          font-weight: bold;
          font-size: 15px;
        }
      }

      button {
        padding: 0px 7px;
        background-color: ${green};
        border: none;
        border-radius: 10px;

        &:hover {
          background-color: ${lightgreen};
        }
      }
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

export const ExpensesTableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background-color: ${secondarybg};
    border: none;
    text-align: center;
  }

  thead tr th {
    color: white;
    font-weight: bold;
    border-bottom-color: white;
    cursor: pointer;

    p {
      display: flex;
      align-items: flex-start;
      justify-content: left;
    }
  }

  tbody tr td {
    color: white;
    border-bottom-color: gray;
    word-wrap: break-word;
    font-weight: bold;

    #action-link {
      color: lightgray;
      text-decoration: none;
    }

    #action-link:hover {
      color: ${green};
      text-decoration: underline;
    }

    #expense-amt {
      color: ${green};
      font-weight: bold;
    }

    #description {
      width: 10px;
    }
  }

  tbody tr {
    border-top: 0;

    &:hover {
      background-color: ${secondarybg};
    }
  }
`;
