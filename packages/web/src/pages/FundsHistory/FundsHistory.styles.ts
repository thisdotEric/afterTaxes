import { green, red, secondarybg } from '../../components/styles/colors';
import styled from 'styled-components';

export const FundsHistoryWrapper = styled.div`
  #card {
    background-color: ${secondarybg};
    border: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }

  #up {
    color: ${green};
  }

  #down {
    color: ${red};
  }
`;
