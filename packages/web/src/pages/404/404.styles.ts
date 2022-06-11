import { green, primarybg } from '../../components/styles/colors';
import styled from 'styled-components';

export const NotFoundPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${primarybg};
  min-height: 100vh;
  color: white;
  font-size: 20px;

  span {
    color: ${green};
    font-weight: bold;
  }
`;
