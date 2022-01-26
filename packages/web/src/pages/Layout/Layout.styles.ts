import styled from 'styled-components';
import { primarybg, secondarybg } from '../../components/styles/colors';

export const MainContentWrapper = styled.div`
  background-color: ${primarybg};
  padding-left: 250px;
  padding-top: 5px;
  min-height: 100vh;
`;

export const SideNavWrapper = styled.div`
  background-color: ${secondarybg};
  height: 100%;
  width: 210px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  div {
    width: 100%;
  }
`;
