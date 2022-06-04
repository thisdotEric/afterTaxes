import styled, { css } from 'styled-components';
import { secondarybg, green, red, white } from '../../components/styles/colors';

interface Props {
  isToday: boolean;
  overspent: boolean;
}

interface CalendarGridProps {
  isLegend?: boolean;
}

export const CalendarGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.813rem;
  cursor: pointer;
  flex-wrap: wrap;
`;

export const CalendarGridDate = styled.div<CalendarGridProps>`
  color: white;
  background-color: ${secondarybg};
  display: flex;
  height: 80px;
  width: 155px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }

  ${({ isLegend }) => {
    if (isLegend) return 'border: 1px solid springgreen;';
  }}
`;

const activeDate = css`
  background-color: ${green};
  border-radius: 10px 0px 0px 10px;
  color: black;
`;

export const CurrentDate = styled.p<{ isToday: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1.2rem;
  text-align: center;
  font-weight: bold;

  ${({ isToday }) => {
    if (isToday) return activeDate;
  }}
`;

export const ExpensesOverview = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
  font-size: 14px;

  ${({ isToday }) => {
    return isToday && 'font-weight: bold;';
  }}

  p {
    padding-bottom: 5px;
  }

  span {
    font-style: italic;
    color: ${({ overspent }) => {
      return overspent ? red : green;
    }};
  }

  .line {
    width: 50%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    margin-bottom: 5px;
  }
`;

export const AddExpenses = styled.div`
  position: fixed;
  right: 50px;
  bottom: 10px;

  #plus-icon {
    color: ${white};
    width: 40px;
    height: 40px;
  }
`;
