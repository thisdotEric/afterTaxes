import styled, { css } from 'styled-components';
import { primarybg, secondarybg } from '../../components/styles/colors';

export const MainContentWrapper = styled.div`
  background-color: ${primarybg};
  padding-left: 250px;
  padding-top: 5px;
  padding-right: 20px;
  min-height: 100vh;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: inline-flexbox;
  justify-content: left;
  align-items: center;

  #header-title {
    font-size: 14px;
    padding: 20px 0px;
    font-weight: bold;
    color: white;
  }

  #monthpicker {
    padding: 8px 10px;
    outline: none;
    font-size: 14px;
    background-color: ${secondarybg};
    border: none;
    caret-color: white;
    color: white;
    font-weight: bold;
    font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 5px;
  }
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
