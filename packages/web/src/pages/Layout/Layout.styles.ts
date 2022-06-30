import styled, { css } from 'styled-components';
import { primarybg, secondarybg } from '../../components/styles/colors';

export const MainContentWrapper = styled.div`
  background-color: ${primarybg};
  padding-left: 250px;
  padding-top: 5px;
  padding-right: 20px;
  min-height: 100vh;

  .datepicker-label {
    font-size: 12px;
    color: rgb(230, 230, 230);
    display: flex;
    justify-content: left;
    align-items: center;
  }

  #datepicker {
    background-color: #2e3139;
    border: none;
    caret-color: white;
    color: white;
    font-weight: bold;
    font-family: 'Montserrat', 'Helvetica Neue', sans-serif;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 160px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  #header-title {
    font-size: 18px;
    padding: 20px 0px;
    font-weight: bold;
    color: white;
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
