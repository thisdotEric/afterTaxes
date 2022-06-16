import { white, lightgreen } from '../../components/styles/colors';
import styled from 'styled-components';

export const DateText = styled.p`
  font-size: 18px;
  padding: 20px 0px;
  font-weight: bold;

  #month {
    color: ${white};
  }

  #year {
    color: ${lightgreen};
  }
`;
