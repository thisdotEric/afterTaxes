import styled from 'styled-components';
import { green } from '../../../components/styles/colors';

export const ConfirmationTransfer = styled.p`
  color: gray;
  padding-bottom: 20px;
  padding-top: 10px;

  span {
    color: ${green};
    font-weight: bold;
  }

  #destination-budget {
    color: lightgray;
  }
`;
