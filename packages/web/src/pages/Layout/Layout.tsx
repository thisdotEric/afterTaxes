import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  SideNavWrapper,
  MainContentWrapper,
  HeaderWrapper,
} from './Layout.styles';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App/AppLogo';
import { HeaderContext, HeaderContextValue } from '../../context';
import AnimatedPage from '../../components/Framer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MonthPicker from '../../components/MonthPicker';

interface LayoutProps {}

function getSavedDate(): Date {
  const localstorageDate = localStorage.getItem('date');

  if (localstorageDate) {
    const storedDate = JSON.parse(localstorageDate);

    return new Date(storedDate);
  } else return new Date();
}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const [header, setHeader] = useState<HeaderContextValue>({
    headerTitle: '',
    date: getSavedDate(),
  });

  const memoizedHeader = useMemo(
    () => ({ header, setHeader }),
    [header, setHeader]
  );

  return (
    <HeaderContext.Provider value={{ ...memoizedHeader }}>
      <SideNavWrapper>
        <div>
          <AppLogo />
          <SideNav />
        </div>
      </SideNavWrapper>

      <MainContentWrapper>
        <HeaderWrapper>
          <DatePicker
            id='monthpicker'
            selected={header.date}
            onChange={(selectedDate) => {
              localStorage.setItem('date', JSON.stringify(selectedDate!));
              setHeader({ ...header, date: selectedDate! });
            }}
            dateFormat='MMMM yyyy'
            showMonthYearPicker
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker
            calendarContainer={MonthPicker}
          />
          <p id='header-title'>&nbsp; {header.headerTitle}</p>
        </HeaderWrapper>

        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </MainContentWrapper>
    </HeaderContext.Provider>
  );
};

export default Layout;
