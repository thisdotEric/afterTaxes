import {
  green,
  grey,
  lightgreen,
  primarybg,
  secondarybg,
} from '../../components/styles/colors';
import styled from 'styled-components';

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

    #action {
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

  #main-table {
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
      font-size: 13px;

      p {
        display: flex;
        align-items: flex-start;
        justify-content: left;
      }

      #hidden-icon {
        opacity: 0;
      }
    }

    tbody tr td {
      font-size: 13px;
      color: white;
      border-bottom-color: gray;
      word-wrap: break-word;
      font-weight: bold;
    }

    tbody tr {
      border-top: 0;

      &:hover {
        background-color: ${secondarybg};
      }
    }
  }
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-top: 15px;
`;

export const TableFooterPaginationWrapper = styled.div`
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

  #paginate-btn {
    padding: 0px 5px;
    height: 20px;
    background-color: ${green};
    border: none;
    border-radius: 10px;

    &:hover {
      background-color: ${lightgreen};
    }

    &:disabled {
      background: gray;
    }

    #paginate-arrow:hover {
      stroke-width: 2.5px;
    }
  }
`;
