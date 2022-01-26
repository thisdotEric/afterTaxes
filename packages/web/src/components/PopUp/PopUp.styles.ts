import styled from 'styled-components';
import { red, white } from '../../components/styles/colors';

export const PopUpWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 40px;
  width: 300px;
  border-radius: 5px;
  background-color: ${red};
  font-size: 13px;
  color: ${white};
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  #close {
    height: 16px;
    width: 16px;
  }
`;
